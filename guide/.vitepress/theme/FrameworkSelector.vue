<script setup lang="ts">
import { useFramework } from './composables/useFramework'

const { currentFramework, setFramework, frameworks } = useFramework()
</script>

<template>
  <div class="framework-selector">
    <button
      v-for="fw in frameworks"
      :key="fw.id"
      :class="['fw-btn', { active: currentFramework === fw.id }]"
      :title="`Ver contenido de ${fw.label}`"
      @click="setFramework(fw.id)"
    >
      <span class="fw-icon">{{ fw.icon }}</span>
      <span class="fw-label">{{ fw.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.framework-selector {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.fw-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.fw-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
}

.fw-btn.active {
  color: var(--vp-c-text-1);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

.fw-icon {
  font-size: 14px;
}

.fw-label {
  display: none;
}

@media (min-width: 768px) {
  .fw-label {
    display: inline;
  }
}
</style>
