"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Key, Check, ExternalLink } from "lucide-react";
import ModelSelector from "./ModelSelector";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SettingsDialog() {
  const { settings, updateSettings, hasApiKey } = useSettings();
  const [open, setOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      updateSettings({ apiKey: apiKeyInput.trim() });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleSelectModel = (modelId: string, modelName: string) => {
    updateSettings({ selectedModel: modelId, modelName });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
          {!hasApiKey && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your OpenRouter API key and select your preferred AI model.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* API Key Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey" className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4" />
                OpenRouter API Key
              </Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={apiKeyInput || settings.apiKey}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveApiKey} disabled={!apiKeyInput.trim()}>
                  {showSuccess ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your API key is stored securely in your browser's local storage and never sent to our servers.
              </p>
            </div>

            {!hasApiKey && (
              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  You need an OpenRouter API key to use this application.{" "}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Get your free API key here
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Model Selection Section */}
          {hasApiKey && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Select AI Model</Label>
                {settings.modelName && (
                  <div className="mb-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Current model:</span>{" "}
                      <span className="font-medium">{settings.modelName}</span>
                    </p>
                  </div>
                )}
              </div>

              <ModelSelector
                apiKey={settings.apiKey}
                selectedModel={settings.selectedModel}
                onSelectModel={handleSelectModel}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <a
            href="https://openrouter.ai/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            OpenRouter Documentation
            <ExternalLink className="w-3 h-3" />
          </a>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
