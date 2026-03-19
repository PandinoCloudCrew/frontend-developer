import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// Usage in any component
function Sidebar() {
  const isOpen = useUIStore((state) => state.sidebarOpen);
  if (!isOpen) return null;
  return <nav>...</nav>;
}
