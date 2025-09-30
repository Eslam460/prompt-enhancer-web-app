export type EnhancePromptRequest = {
  prompt: string;
  category: string;
};

export type EnhancePromptResponse = {
  enhancedPrompt: string;
  explanation: string;
};

export async function enhancePrompt(
  request: EnhancePromptRequest
): Promise<EnhancePromptResponse> {
  const response = await fetch("/api/enhance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to enhance prompt");
  }

  return response.json();
}