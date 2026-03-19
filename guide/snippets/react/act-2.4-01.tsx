// src/components/Tabs/TabsContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextValue {
  activeIndex: number;
  tabCount: number;
  selectTab: (index: number) => void;
  registerTab: () => number;
  selectNext: () => void;
  selectPrevious: () => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab components must be inside <TabGroup>');
  return ctx;
}

export function TabGroup({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  let count = 0;

  const value: TabsContextValue = {
    activeIndex,
    tabCount: count,
    selectTab: setActiveIndex,
    registerTab: () => count++,
    selectNext: () =>
      setActiveIndex((i) => (i + 1) % (count || 1)),
    selectPrevious: () =>
      setActiveIndex((i) => (i - 1 + (count || 1)) % (count || 1)),
  };

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
}
