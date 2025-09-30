"use client";

import { Code, Palette, Search, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type Category = "programming" | "design" | "research" | "general";

type SidebarProps = {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
};

const categories = [
  {
    id: "programming" as Category,
    label: "Programming",
    icon: Code,
    description: "Code generation & debugging"
  },
  {
    id: "design" as Category,
    label: "Design",
    icon: Palette,
    description: "UI/UX & image generation"
  },
  {
    id: "research" as Category,
    label: "Research",
    icon: Search,
    description: "Knowledge retrieval"
  },
  {
    id: "general" as Category,
    label: "General",
    icon: MessageSquare,
    description: "General queries"
  }
];

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm p-6">
      <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
        Categories
      </h2>
      <div className="space-y-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all duration-200",
                "hover:bg-accent/50 group",
                isActive && "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              )}
            >
              <div className="flex items-center gap-3 mb-1">
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span className="font-medium">{category.label}</span>
              </div>
              <p className={cn(
                "text-xs ml-8",
                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {category.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </aside>
  );
}