import { ref, watch, onMounted } from 'vue'

export type Framework = 'angular' | 'react' | 'vue'

export const FRAMEWORKS: { id: Framework; label: string; icon: string }[] = [
  { id: 'angular', label: 'Angular', icon: '🅰️' },
  { id: 'react', label: 'React', icon: '⚛️' },
  { id: 'vue', label: 'Vue', icon: '💚' },
]

const STORAGE_KEY = 'frontend-guide-framework'

// Global reactive state shared across all components
const currentFramework = ref<Framework>('angular')

export function useFramework() {
  onMounted(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY) as Framework | null
    if (stored && FRAMEWORKS.some(f => f.id === stored)) {
      currentFramework.value = stored
    }
    applyFrameworkClass(currentFramework.value)
  })

  watch(currentFramework, (fw) => {
    localStorage.setItem(STORAGE_KEY, fw)
    applyFrameworkClass(fw)
  })

  function setFramework(fw: Framework) {
    currentFramework.value = fw
  }

  return {
    currentFramework,
    setFramework,
    frameworks: FRAMEWORKS,
  }
}

function applyFrameworkClass(fw: Framework) {
  if (typeof document === 'undefined') return
  const html = document.documentElement
  // Remove all framework classes
  FRAMEWORKS.forEach(f => html.classList.remove(`fw-${f.id}`))
  // Add the selected one
  html.classList.add(`fw-${fw}`)
}
