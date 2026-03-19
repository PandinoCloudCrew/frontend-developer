// src/components/Tabs/Tab.tsx
import { useRef } from 'react';
import { useTabsContext } from './TabsContext';

interface TabProps {
  label: string;
  index: number;
}

export function Tab({ label, index }: TabProps) {
  const { activeIndex, selectTab, selectNext, selectPrevious } =
    useTabsContext();
  const ref = useRef<HTMLButtonElement>(null);
  const isActive = activeIndex === index;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') selectNext();
    if (e.key === 'ArrowLeft') selectPrevious();
  };

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      className={isActive ? 'tab active' : 'tab'}
      onClick={() => selectTab(index)}
      onKeyDown={handleKeyDown}
    >
      {label}
    </button>
  );
}
