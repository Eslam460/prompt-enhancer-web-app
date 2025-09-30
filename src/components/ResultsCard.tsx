"use client";

import { Copy, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";

type ResultsCardProps = {
  enhancedPrompt: string;
  explanation: string;
  onAddToHistory: () => void;
};

export default function ResultsCard({ enhancedPrompt, explanation, onAddToHistory }: ResultsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    onAddToHistory();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([enhancedPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enhanced-prompt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onAddToHistory();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 mt-8"
    >
      <Card className="p-6 rounded-2xl bg-card/80 backdrop-blur-md border-2 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Enhanced Prompt
          </h3>
          
          <div className="flex gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="rounded-lg"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="rounded-lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-xl p-4 mb-4">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{enhancedPrompt}</p>
        </div>
        
        {explanation && (
          <>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
              Why this works better:
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {explanation}
            </p>
          </>
        )}
      </Card>
    </motion.div>
  );
}