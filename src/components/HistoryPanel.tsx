"use client";

import { useState, useEffect } from "react";
import { History, Copy, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export type HistoryItem = {
  id: string;
  prompt: string;
  enhancedPrompt: string;
  category: string;
  timestamp: number;
};

type HistoryPanelProps = {
  onSelect?: (item: HistoryItem) => void;
};

export default function HistoryPanel({ onSelect }: HistoryPanelProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
    
    const handleUpdate = () => {
      loadHistory();
    };
    
    window.addEventListener("promptHistoryUpdated", handleUpdate);
    return () => window.removeEventListener("promptHistoryUpdated", handleUpdate);
  }, []);

  const loadHistory = () => {
    const saved = localStorage.getItem("promptHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    }
  };

  const handleCopy = async (item: HistoryItem) => {
    await navigator.clipboard.writeText(item.enhancedPrompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const newHistory = history.filter((item) => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem("promptHistory", JSON.stringify(newHistory));
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem("promptHistory");
  };

  if (history.length === 0) {
    return (
      <Card className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border-2">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">History</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-8">
          Your enhanced prompts will appear here
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">History</h3>
          <span className="text-xs text-muted-foreground">({history.length}/10)</span>
        </div>
        <Button
          onClick={handleClearAll}
          variant="ghost"
          size="sm"
          className="text-xs"
        >
          Clear All
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors border border-border/50 group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">
                    {new Date(item.timestamp).toLocaleDateString()} • {item.category}
                  </div>
                  <p className="text-sm line-clamp-2">{item.prompt}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    onClick={() => handleCopy(item)}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

export function addToHistory(item: Omit<HistoryItem, "id" | "timestamp">) {
  const saved = localStorage.getItem("promptHistory");
  let history: HistoryItem[] = [];
  
  if (saved) {
    try {
      history = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse history:", e);
    }
  }

  const newItem: HistoryItem = {
    ...item,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };

  history.unshift(newItem);
  
  // Keep only last 10 items
  if (history.length > 10) {
    history = history.slice(0, 10);
  }

  localStorage.setItem("promptHistory", JSON.stringify(history));
  
  // Dispatch event to notify components
  window.dispatchEvent(new Event("promptHistoryUpdated"));
}