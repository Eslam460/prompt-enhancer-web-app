import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPTS } from "@/lib/system-prompts";

export async function POST(request: NextRequest) {
  try {
    const { prompt, category, apiKey, model } = await request.json();

    if (!prompt || !category) {
      return NextResponse.json(
        { error: "Prompt and category are required" },
        { status: 400 }
      );
    }

    const openRouterKey = apiKey || process.env.OPENROUTER_API_KEY;

    if (!openRouterKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const selectedModel = model || process.env.OPENROUTER_MODEL || "openai/gpt-oss-20b:free";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Prompt Enhancer",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPTS[category as keyof typeof SYSTEM_PROMPTS],
          },
          {
            role: "user",
            content: `Original prompt: "${prompt}"\n\nPlease provide:\n1. An enhanced version of this prompt that will generate better results\n2. A brief explanation (2-3 sentences) of why the enhanced version is better\n\nFormat your response as:\nENHANCED: [enhanced prompt here]\nEXPLANATION: [explanation here]`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: errorData?.error || errorData?.message || "Failed to enhance prompt" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";

    // Parse the response
    const enhancedMatch = content.match(/ENHANCED:\s*([\s\S]+?)(?=EXPLANATION:|$)/);
    const explanationMatch = content.match(/EXPLANATION:\s*([\s\S]+?)$/);

    const enhancedPrompt = enhancedMatch ? enhancedMatch[1].trim() : content;
    const explanation = explanationMatch ? explanationMatch[1].trim() : "This enhanced prompt provides more clarity and context for better results.";

    return NextResponse.json({
      enhancedPrompt,
      explanation,
    });
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
