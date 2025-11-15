import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leaseText } = await req.json();
    
    if (!leaseText) {
      return new Response(JSON.stringify({ error: 'Lease text is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Analyzing lease with Claude...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `You are Lease Fairy, an AI assistant that helps renters understand their lease agreements. Analyze this lease and provide a structured response in JSON format with the following sections:

{
  "overview": {
    "agreementType": "string",
    "duration": "string",
    "monthlyRent": "string",
    "securityDeposit": "string"
  },
  "redFlags": [
    {
      "title": "string",
      "description": "string",
      "severity": "high" | "medium" | "low"
    }
  ],
  "importantDates": [
    {
      "date": "string",
      "description": "string",
      "urgent": boolean
    }
  ],
  "fees": [
    {
      "name": "string",
      "amount": "string",
      "refundable": boolean
    }
  ],
  "tenantResponsibilities": ["string"],
  "landlordResponsibilities": ["string"],
  "legalTerms": [
    {
      "term": "string",
      "definition": "string"
    }
  ]
}

Lease Document:
${leaseText}`
          }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', response.status, error);
      return new Response(JSON.stringify({ error: 'Failed to analyze lease' }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Claude response received');
    
    const content = data.content[0].text;
    
    // Extract JSON from response (Claude might wrap it in markdown)
    let analysis;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = JSON.parse(content);
      }
    } catch (e) {
      console.error('Failed to parse Claude response:', e);
      return new Response(JSON.stringify({ error: 'Failed to parse analysis', rawContent: content }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-lease function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
