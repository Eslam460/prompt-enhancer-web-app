"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from "lucide-react";
import { Category } from "./Sidebar";

type PromptInputProps = {
  category: Category;
  onEnhance: (prompt: string) => void;
  isLoading: boolean;
};

export default function PromptInput({ category, onEnhance, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleEnhance = () => {
    if (prompt.trim()) {
      onEnhance(prompt);
    }
  };

  const handleClear = () => {
    setPrompt("");
  };

  const getCategoryPlaceholder = () => {
    switch (category) {
      case "programming":
        return "Example: Create a function that validates email addresses...";
      case "design":
        return "Example: Design a modern login page with dark mode...";
      case "research":
        return "Example: Explain the concept of quantum computing...";
      case "general":
        return "Example: Write a compelling product description...";
      default:
        return "Enter your prompt here...";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={getCategoryPlaceholder()}
          className="min-h-[200px] text-lg p-6 rounded-2xl border-2 focus:border-primary resize-none bg-card/50 backdrop-blur-sm shadow-lg"
          disabled={isLoading}
        />
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
          {prompt.length} characters
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button
          onClick={handleEnhance}
          disabled={!prompt.trim() || isLoading}
          className="flex-1 rounded-xl py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Enhance Prompt
            </>
          )}
        </Button>
        
        <Button
          onClick={handleClear}
          variant="outline"
          disabled={isLoading}
          className="rounded-xl px-6"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}