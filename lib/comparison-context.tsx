'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tool } from './types';

interface ComparisonContextType {
  selectedTools: Tool[];
  addToolForComparison: (tool: Tool) => void;
  removeToolForComparison: (toolId: string) => void;
  clearComparison: () => void;
  isToolSelected: (toolId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  const addToolForComparison = (tool: Tool) => {
    if (selectedTools.find(t => t.id === tool.id)) return;
    if (selectedTools.length >= 2) {
      setSelectedTools([selectedTools[1], tool]);
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const removeToolForComparison = (toolId: string) => {
    setSelectedTools(selectedTools.filter(t => t.id !== toolId));
  };

  const clearComparison = () => {
    setSelectedTools([]);
  };

  const isToolSelected = (toolId: string) => {
    return selectedTools.some(t => t.id === toolId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedTools,
        addToolForComparison,
        removeToolForComparison,
        clearComparison,
        isToolSelected
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
