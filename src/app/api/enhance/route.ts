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
      programming: `You are an elite software engineering prompt specialist. Transform the user's prompt into a comprehensive, production-ready specification that includes:

1. **Technical Specifications**: Programming language, framework/libraries, version requirements
2. **Functional Requirements**: Clear input/output expectations, edge cases, error handling
3. **Code Quality Standards**: Performance considerations, security best practices, design patterns
4. **Deliverables**: Code structure, documentation level, testing requirements
5. **Context**: Use case, scale, environment (development/production)

Make it specific enough that any developer can implement it without ambiguity. Use industry-standard terminology.`,

      design: `You are a senior UI/UX design strategist. Transform the user's prompt into a detailed design brief that includes:

1. **Visual Identity**: Color palette (with hex codes), typography, visual style (modern/minimal/bold/etc.)
2. **Layout Structure**: Component hierarchy, spacing system, responsive breakpoints
3. **User Experience**: Target audience, user flow, interactive elements, accessibility standards (WCAG)
4. **Design System**: Consistency rules, component variants, states (hover/active/disabled)
5. **Technical Constraints**: Platform (web/mobile), framework compatibility, animation preferences
6. **Inspiration References**: Design trends or styles to emulate or avoid

Ensure the prompt guides toward pixel-perfect, user-centered design.`,

      research: `You are an academic research consultant. Transform the user's prompt into a structured research inquiry that includes:

1. **Research Scope**: Specific questions to answer, key topics to explore, boundaries of investigation
2. **Depth & Breadth**: Level of detail required (overview/intermediate/expert), breadth of coverage
3. **Source Requirements**: Types of sources needed (academic papers/case studies/statistics), recency requirements
4. **Structure & Format**: Desired organization (chronological/thematic/comparative), section breakdown
5. **Critical Analysis**: Whether to include pros/cons, different perspectives, evaluation criteria
6. **Practical Application**: How the information will be used, actionable insights needed
7. **Citation Style**: APA/MLA/Chicago or specific reference format

Guide toward comprehensive, credible, and actionable research outputs.`,

      general: `You are a master prompt engineer. Transform the user's prompt to maximize AI response quality by including:

1. **Clear Objective**: Specific goal, desired outcome, success criteria
2. **Contextual Framework**: Background information, audience, purpose, constraints
3. **Output Specifications**: 
   - Format (essay/list/table/step-by-step/creative)
   - Length (word count/sections)
   - Tone (professional/casual/persuasive/educational)
   - Style preferences
4. **Quality Requirements**: Level of detail, depth of analysis, credibility standards
5. **Examples or References**: If applicable, include "similar to X" or "avoid Y"
6. **Evaluation Criteria**: How to measure if the response meets expectations

Transform vague requests into precise, actionable prompts that leave no room for misinterpretation.`,
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
