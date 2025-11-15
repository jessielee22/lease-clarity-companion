import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Anthropic from "@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeaseAnalysis {
  overview: {
    agreementType: string;
    duration: string;
    monthlyRent: string;
    hiddenFees: string[];
  };
  responsibilities: {
    tenant: string[];
    landlord: string[];
  };
  keyDates: {
    startDate: string;
    endDate: string;
    renewalDate: string;
    noticeDeadline: string;
  };
  redFlags: {
    category: string;
    issue: string;
    severity: 'high' | 'medium' | 'low';
    explanation: string;
  }[];
  whatIfScenarios: {
    earlyTermination: string;
    latePayment: string;
    maintenanceIssues: string;
  };
  tenantRights: string[];
  legalJargon: {
    term: string;
    definition: string;
    location: string;
  }[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userLocation = formData.get("userLocation") as string | null;

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      Array.from(new Uint8Array(arrayBuffer))
        .map(byte => String.fromCharCode(byte))
        .join('')
    );

    console.log("Extracting text from PDF...");
    const extractMessage = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: base64
            }
          },
          {
            type: 'text',
            text: 'Extract all text from this lease document. Return only the raw text content without any commentary.'
          }
        ]
      }]
    });

    const leaseText = extractMessage.content
      .filter(block => block.type === 'text')
      .map(block => (block as any).text)
      .join('\n');

    // Chunk and analyze
    const chunks = chunkDocument(leaseText);
    console.log(`Analyzing ${chunks.length} chunks...`);

    const chunkAnalyses = await Promise.all(
      chunks.map(chunk => analyzeChunk(anthropic, chunk, userLocation))
    );

    // Synthesize final analysis
    console.log("Synthesizing final analysis...");
    const analysis = await synthesizeAnalysis(anthropic, chunkAnalyses);

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error analyzing lease:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function chunkDocument(text: string, maxChunkSize = 15000) {
  const chunks: Array<{ content: string; metadata: { chunkIndex: number; totalChunks: number } }> = [];
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    if ((currentChunk + paragraph).length > maxChunkSize && currentChunk) {
      chunks.push({
        content: currentChunk.trim(),
        metadata: { chunkIndex, totalChunks: 0 }
      });
      currentChunk = paragraph;
      chunkIndex++;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }

  if (currentChunk) {
    chunks.push({
      content: currentChunk.trim(),
      metadata: { chunkIndex, totalChunks: 0 }
    });
  }

  chunks.forEach(chunk => {
    chunk.metadata.totalChunks = chunks.length;
  });

  return chunks;
}

async function analyzeChunk(anthropic: any, chunk: any, userLocation: string | null) {
  const prompt = `You are analyzing a section of a residential lease agreement. Extract the following information if present:

1. Financial terms (rent, deposits, fees)
2. Duration and dates
3. Responsibilities (tenant and landlord)
4. Legal terms and jargon
5. Potentially problematic clauses
6. Important deadlines

Lease section (${chunk.metadata.chunkIndex + 1}/${chunk.metadata.totalChunks}):
${chunk.content}

${userLocation ? `User location: ${userLocation}. Flag any clauses that may violate local tenant laws.` : ''}

Return your analysis in JSON format with these keys:
- financialTerms: array of financial details found
- dates: array of important dates
- responsibilities: object with tenant and landlord arrays
- legalTerms: array of {term, definition, context}
- concerns: array of {issue, severity, explanation}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }]
  });

  const text = message.content
    .filter((block: any) => block.type === 'text')
    .map((block: any) => block.text)
    .join('\n')
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse chunk analysis:', text);
    return {};
  }
}

async function synthesizeAnalysis(anthropic: any, chunkAnalyses: any[]): Promise<LeaseAnalysis> {
  const consolidatedData = JSON.stringify(chunkAnalyses, null, 2);

  const prompt = `You are Lease Fairy, an AI assistant that helps renters understand their lease agreements.

Based on the analyzed sections of a lease document, create a comprehensive summary:

Analyzed sections:
${consolidatedData}

Create a complete lease analysis with:
1. Clear overview (agreement type, duration, costs including hidden fees)
2. Tenant and landlord responsibilities
3. Key dates (start, end, renewal, notice deadlines)
4. Red flags (categorized by severity: high/medium/low)
5. What-if scenarios (early termination, late payment, maintenance)
6. Tenant rights summary
7. Legal jargon dictionary with plain English definitions

Return ONLY valid JSON matching this structure:
{
  "overview": {
    "agreementType": "string",
    "duration": "string",
    "monthlyRent": "string",
    "hiddenFees": ["string"]
  },
  "responsibilities": {
    "tenant": ["string"],
    "landlord": ["string"]
  },
  "keyDates": {
    "startDate": "string",
    "endDate": "string",
    "renewalDate": "string",
    "noticeDeadline": "string"
  },
  "redFlags": [{
    "category": "string",
    "issue": "string",
    "severity": "high|medium|low",
    "explanation": "string"
  }],
  "whatIfScenarios": {
    "earlyTermination": "string",
    "latePayment": "string",
    "maintenanceIssues": "string"
  },
  "tenantRights": ["string"],
  "legalJargon": [{
    "term": "string",
    "definition": "string",
    "location": "string"
  }]
}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }]
  });

  const text = message.content
    .filter((block: any) => block.type === 'text')
    .map((block: any) => block.text)
    .join('\n')
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(text);
}
