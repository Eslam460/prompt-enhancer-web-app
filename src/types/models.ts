export type OpenRouterModel = {
  id: string;
  name: string;
  description?: string;
  context_length: number;
  pricing: {
    prompt: string;
    completion: string;
  };
  top_provider?: {
    max_completion_tokens?: number;
    is_moderated: boolean;
  };
  architecture?: {
    modality: string;
    tokenizer: string;
    instruct_type?: string;
  };
  created: number;
};

export type ModelGroup = {
  free: OpenRouterModel[];
  paid: OpenRouterModel[];
};

export type UserSettings = {
  apiKey: string;
  selectedModel: string;
  modelName?: string;
};
