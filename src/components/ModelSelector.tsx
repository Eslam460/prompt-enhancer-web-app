"use client";

import { useState, useEffect } from "react";
import { OpenRouterModel, ModelGroup } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Loader2, DollarSign, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ModelSelectorProps = {
  apiKey: string;
  selectedModel: string;
  onSelectModel: (modelId: string, modelName: string) => void;
};

export default function ModelSelector({
  apiKey,
  selectedModel,
  onSelectModel,
}: ModelSelectorProps) {
  const [models, setModels] = useState<ModelGroup | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (apiKey) {
      fetchModels();
    }
  }, [apiKey]);

  const fetchModels = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch models");
      }

      const data: ModelGroup = await response.json();
      setModels(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch models");
    } finally {
      setLoading(false);
    }
  };

  const ModelCard = ({ model }: { model: OpenRouterModel }) => {
    const isSelected = model.id === selectedModel;
    const isFree = parseFloat(model.pricing.prompt) === 0;

    return (
      <button
        onClick={() => onSelectModel(model.id, model.name)}
        className={cn(
          "w-full text-left p-4 rounded-xl border-2 transition-all",
          "hover:border-primary/50 hover:bg-accent/50",
          isSelected && "border-primary bg-primary/5"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold truncate text-sm">{model.name}</h4>
              {isFree && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  Free
                </span>
              )}
            </div>
            {model.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {model.description}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Context: {(model.context_length / 1000).toFixed(0)}K</span>
              {!isFree && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {parseFloat(model.pricing.prompt).toFixed(6)}/token
                </span>
              )}
            </div>
          </div>
          {isSelected && (
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          )}
        </div>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/20">
        <p className="text-sm text-destructive text-center">{error}</p>
        <Button
          onClick={fetchModels}
          variant="outline"
          size="sm"
          className="mt-4 mx-auto block"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!models) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          Enter your API key to load available models
        </p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="free" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="free" className="gap-2">
          <Zap className="w-4 h-4" />
          Free Models
          <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-xs">
            {models.free.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="paid" className="gap-2">
          <DollarSign className="w-4 h-4" />
          Paid Models
          <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-xs">
            {models.paid.length}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="free">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {models.free.length > 0 ? (
              models.free.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No free models available
              </p>
            )}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="paid">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {models.paid.length > 0 ? (
              models.paid.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No paid models available
              </p>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
