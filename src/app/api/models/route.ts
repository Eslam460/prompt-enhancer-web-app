import { NextRequest, NextResponse } from "next/server";
import { OpenRouterModel, ModelGroup } from "@/types/models";

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData?.error || "Failed to fetch models" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const models: OpenRouterModel[] = data.data || [];

    const modelGroup: ModelGroup = {
      free: [],
      paid: [],
    };

    models.forEach((model) => {
      const promptPrice = parseFloat(model.pricing.prompt);
      const completionPrice = parseFloat(model.pricing.completion);
      
      if (promptPrice === 0 && completionPrice === 0) {
        modelGroup.free.push(model);
      } else {
        modelGroup.paid.push(model);
      }
    });

    modelGroup.free.sort((a, b) => a.name.localeCompare(b.name));
    modelGroup.paid.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(modelGroup);
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
