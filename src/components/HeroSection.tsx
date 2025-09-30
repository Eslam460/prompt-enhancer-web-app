"use client";

import { Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type HeroSectionProps = {
  onGetStarted: () => void;
};

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Prompt Optimization
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Transform Your Prompts Into
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Perfect Instructions
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Enhance your AI prompts for programming, design, and research. 
          Get better results with optimized, clear, and effective prompts.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Button
            size="lg"
            onClick={onGetStarted}
            className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/20"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Enhancing
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Programming</h3>
            <p className="text-sm text-muted-foreground">
              Optimize prompts for code generation, debugging, and development tasks
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="font-semibold mb-2">Design</h3>
            <p className="text-sm text-muted-foreground">
              Create better prompts for UI/UX design and image generation
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Research</h3>
            <p className="text-sm text-muted-foreground">
              Enhance prompts for knowledge retrieval and structured responses
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const Code = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);