import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import FrameworkSelector from './FrameworkSelector.vue'
import './framework-filter.css'
import { h, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

function tagFrameworkSidebarItems() {
  // Find sidebar items whose text contains framework identifiers
  // and add CSS classes for filtering
  const sidebarItems = document.querySelectorAll('.VPSidebarItem')
  sidebarItems.forEach(item => {
    const text = item.querySelector('.text')?.textContent?.trim() || ''

    // Remove existing framework classes
    item.classList.remove('sidebar-angular', 'sidebar-react', 'sidebar-vue')

    // Tag based on content
    if (text.includes('🅰️') || text.toLowerCase().includes('angular')) {
      item.classList.add('sidebar-angular')
    } else if (text.includes('⚛️') || text.toLowerCase().includes('react')) {
      item.classList.add('sidebar-react')
    } else if (text.includes('💚') || text.toLowerCase().includes('vue')) {
      item.classList.add('sidebar-vue')
    }
  })
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(FrameworkSelector),
    })
  },
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    // Tag sidebar items after each navigation
    router.onAfterRouteChanged = () => {
      nextTick(() => {
        setTimeout(tagFrameworkSidebarItems, 100)
      })
    }

    // Also tag on initial load
    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(tagFrameworkSidebarItems, 200)
      })
    }
  },
} satisfies Theme
