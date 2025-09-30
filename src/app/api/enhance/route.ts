import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, category } = await request.json();

    if (!prompt || !category) {
      return NextResponse.json(
        { error: "Prompt and category are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const systemPrompts = {
      programming: `You are an expert at crafting programming prompts. Enhance the user's prompt to be more specific, clear, and effective for code generation, debugging, or optimization tasks. Include relevant technical details, desired output format, and any constraints.`,
      design: `You are an expert at crafting design prompts. Enhance the user's prompt to be more descriptive and specific for UI/UX design or image generation. Include visual details, style preferences, color schemes, and layout considerations.`,
      research: `You are an expert at crafting research prompts. Enhance the user's prompt to request structured, comprehensive, and well-cited information. Include specific aspects to cover, desired depth, and format preferences.`,
      general: `You are an expert at crafting effective prompts. Enhance the user's prompt to be clearer, more specific, and more likely to generate high-quality responses. Include relevant context and desired output characteristics.`,
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Prompt Enhancer",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "nvidia/nemotron-nano-9b-v2:free",
        messages: [
          {
            role: "system",
            content: systemPrompts[category as keyof typeof systemPrompts],
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
    const enhancedMatch = content.match(/ENHANCED:\s*(.+?)(?=EXPLANATION:|$)/s);
    const explanationMatch = content.match(/EXPLANATION:\s*(.+?)$/s);

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