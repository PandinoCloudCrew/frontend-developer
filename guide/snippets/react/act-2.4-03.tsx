// src/components/Tabs/TabPanel.tsx
import { ReactNode } from 'react';
import { useTabsContext } from './TabsContext';

interface TabPanelProps {
  index: number;
  children: ReactNode;
}

export function TabPanel({ index, children }: TabPanelProps) {
  const { activeIndex } = useTabsContext();
  if (activeIndex !== index) return null;

  return <div role="tabpanel">{children}</div>;
}
