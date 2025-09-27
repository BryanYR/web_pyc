<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LogoWhite from '@/assets/icons/LogoWhite.vue'

// show the loader when component mounts (client-side)
const visible = ref(true)

// duration the loader will be visible (ms)
const DURATION = 3000

onMounted(() => {
  // ensure loader runs on full page load / reload
  setTimeout(() => {
    visible.value = false
  }, DURATION)
})
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="fixed top-0 bottom-0 inset-0 z-[9999] flex items-center justify-center bg-primary-700">
      <div class="loader-wrap">
        <LogoWhite class="loader-logo" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.loader-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader-logo {
  width: 12rem;
  height: auto;
  color: white;
  animation: pulse 2.2s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.95;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.95;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
