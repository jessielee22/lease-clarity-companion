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

    console.log(`Processing file: ${file.name}, size: ${file.size} bytes`);
    
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
            text: 'Extract all text from this lease document. Preserve the exact wording, amounts, and dates. Return only the raw text content without any commentary or modifications.'
          }
        ]
      }]
    });

    const leaseText = extractMessage.content
      .filter(block => block.type === 'text')
      .map(block => (block as any).text)
      .join('\n');

    console.log(`Extracted text length: ${leaseText.length} characters`);

    // Chunk and analyze
    const chunks = chunkDocument(leaseText);
    console.log(`Analyzing ${chunks.length} chunks...`);

    const chunkAnalyses = await Promise.all(
      chunks.map(chunk => analyzeChunk(anthropic, chunk, userLocation))
    );

    console.log("Chunk analyses complete, synthesizing final analysis...");
    const analysis = await synthesizeAnalysis(anthropic, chunkAnalyses);
    
    console.log("Analysis complete:", {
      agreementType: analysis.overview.agreementType,
      monthlyRent: analysis.overview.monthlyRent,
      duration: analysis.overview.duration,
      redFlagsCount: analysis.redFlags.length
    });

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
  const prompt = `You are analyzing a section of a residential lease agreement. Extract ONLY information that is EXPLICITLY stated in the text below. Do not infer, assume, or fabricate anything.

Extract the following if present in THIS EXACT SECTION:
1. Financial terms - EXACT dollar amounts stated (e.g., "$1,500 monthly rent", "$500 security deposit")
2. Duration and dates - EXACT dates or timeframes mentioned (e.g., "January 1, 2025 to December 31, 2025")
3. Responsibilities - SPECIFIC duties explicitly listed for tenant and landlord
4. Legal terms - Technical or legal language with their context
5. Concerning clauses - Unusual terms ACTUALLY in the text (e.g., high fees, unfair clauses)
6. Important deadlines - SPECIFIC dates or timeframes stated

CRITICAL RULES:
- If a date/amount is not in this section, do NOT include it
- Use exact wording and numbers from the lease
- If something is unclear or not mentioned, note that explicitly

Lease section (${chunk.metadata.chunkIndex + 1}/${chunk.metadata.totalChunks}):
${chunk.content}

${userLocation ? `User location: ${userLocation}. Flag any clauses that may violate local tenant laws in that area.` : ''}

Return your analysis in valid JSON format with these keys:
- financialTerms: array of objects with {item, amount, context} for financial details found
- dates: array of objects with {type, date, context} for dates mentioned
- responsibilities: object with tenant and landlord arrays of specific duties
- legalTerms: array of {term, definition, context} for legal language
- concerns: array of {issue, severity, explanation} for concerning clauses ACTUALLY found`;

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
    console.error('Failed to parse chunk analysis:', text.substring(0, 200));
    return {
      financialTerms: [],
      dates: [],
      responsibilities: { tenant: [], landlord: [] },
      legalTerms: [],
      concerns: []
    };
  }
}

async function synthesizeAnalysis(anthropic: any, chunkAnalyses: any[]): Promise<LeaseAnalysis> {
  const consolidatedData = JSON.stringify(chunkAnalyses, null, 2);

  const prompt = `You are Lease Fairy, an AI assistant that helps renters understand their lease agreements.

CRITICAL INSTRUCTIONS - FOLLOW EXACTLY:
- Use ONLY the information extracted from the analyzed sections below
- Do NOT make up, infer, or assume any information
- For any field where information is not found, use "Not specified in lease"
- Use EXACT amounts, dates, and terms from the extracted data
- Do not add generic information or typical lease terms not found in this specific lease

Based on the analyzed sections below, create a factual lease analysis:

Analyzed sections:
${consolidatedData}

SYNTHESIS RULES:
1. Overview: Use only explicitly stated agreement type, duration, rent amount, and fees
2. Responsibilities: Include only duties specifically mentioned in the sections
3. Key dates: Use only actual dates found - if a date type isn't found, use "Not specified"
4. Red flags: Include only concerning clauses that were actually identified in the analysis
5. What-if scenarios: Base responses on actual lease terms found, not generic advice
6. Tenant rights: Based on terms in THIS lease
7. Legal jargon: Only terms that were actually found in the lease text

If critical information like rent amount or dates is missing, use "Not found in analyzed sections" or similar.

Return ONLY valid JSON matching this exact structure:
{
  "overview": {
    "agreementType": "string (from lease or 'Not specified')",
    "duration": "string (exact duration found or 'Not specified')",
    "monthlyRent": "string (exact amount or 'Not specified')",
    "hiddenFees": ["array of actual fees found"]
  },
  "responsibilities": {
    "tenant": ["array of specific tenant duties found"],
    "landlord": ["array of specific landlord duties found"]
  },
  "keyDates": {
    "startDate": "string (actual date or 'Not specified')",
    "endDate": "string (actual date or 'Not specified')",
    "renewalDate": "string (actual date or 'Not specified')",
    "noticeDeadline": "string (actual deadline or 'Not specified')"
  },
  "redFlags": [{
    "category": "string",
    "issue": "string (actual issue found)",
    "severity": "high|medium|low",
    "explanation": "string (based on actual clause)"
  }],
  "whatIfScenarios": {
    "earlyTermination": "string (based on actual lease terms)",
    "latePayment": "string (based on actual lease terms)",
    "maintenanceIssues": "string (based on actual lease terms)"
  },
  "tenantRights": ["array of rights mentioned or implied by lease terms"],
  "legalJargon": [{
    "term": "string (actual term from lease)",
    "definition": "string (plain English)",
    "location": "string (where found)"
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
