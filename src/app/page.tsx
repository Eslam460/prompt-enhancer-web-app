"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar, { Category } from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import PromptInput from "@/components/PromptInput";
import ResultsCard from "@/components/ResultsCard";
import HistoryPanel, { addToHistory } from "@/components/HistoryPanel";
import { enhancePrompt } from "@/lib/api";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSettings } from "@/hooks/useSettings";

export default function Home() {
  const [showHero, setShowHero] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("programming");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ enhancedPrompt: string; explanation: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originalPrompt, setOriginalPrompt] = useState("");
  const { settings } = useSettings();

  const handleGetStarted = () => {
    setShowHero(false);
  };

  const handleEnhance = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setOriginalPrompt(prompt);
    
    try {
      const response = await enhancePrompt({
        prompt,
        category: selectedCategory,
        apiKey: settings.apiKey,
        model: settings.selectedModel,
      });
      
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to enhance prompt");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToHistory = () => {
    if (result && originalPrompt) {
      addToHistory({
        prompt: originalPrompt,
        enhancedPrompt: result.enhancedPrompt,
        category: selectedCategory,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {showHero ? (
        <HeroSection onGetStarted={handleGetStarted} />
      ) : (
        <div className="flex pt-20">
          <Sidebar 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <main className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-2">Enhance Your Prompt</h2>
              <p className="text-muted-foreground mb-8">
                Enter your prompt below and we'll help you optimize it for better results.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <PromptInput
                    category={selectedCategory}
                    onEnhance={handleEnhance}
                    isLoading={isLoading}
                  />
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {result && (
                    <ResultsCard
                      enhancedPrompt={result.enhancedPrompt}
                      explanation={result.explanation}
                      onAddToHistory={handleAddToHistory}
                    />
                  )}
                </div>
                
                <div className="lg:col-span-1">
                  <HistoryPanel />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}