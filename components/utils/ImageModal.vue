<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

interface Props {
  modelValue: boolean
  src: string
  alt?: string
  title?: string
  closeOnEsc?: boolean
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  title: '',
  closeOnEsc: true,
  closeOnBackdrop: true
})

const emit = defineEmits<(e: 'update:modelValue', v: boolean) => void>()

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (!props.modelValue) return
  if (props.closeOnEsc && e.key === 'Escape') {
    e.preventDefault()
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="imodal" appear>
      <dialog
        v-if="modelValue"
        class="fixed top-0 left-0 bottom-0 w-full h-full flex justify-center items-center z-[1000]  p-0 bg-transparent"
        aria-modal="true"
        open
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/60 imodal-overlay"
          @click="props.closeOnBackdrop ? close() : undefined"
        />

        <!-- Panel -->
        <div
          class="relative z-10 w-[92vw] md:w-auto max-w-5xl max-h-[90vh] rounded-2xl bg-white dark:bg-primary-800 shadow-2xl overflow-hidden imodal-panel"
          @click.stop
        >
          <div v-if="title" class="px-4 py-3 border-b border-gray-200/60 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-white">
            {{ title }}
          </div>
          <img :src="src" :alt="alt" class="block max-h-[85vh] w-full object-contain bg-black/5" />
          <button
            type="button"
            aria-label="Close"
            class="absolute top-3 right-3 rounded-full bg-black/60 text-white w-8 h-8 flex items-center justify-center hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
            @click="close"
          >
            ✕
          </button>
        </div>
  </dialog>
    </Transition>
  </Teleport>
  
</template>

<style scoped>
/* overlay fade */
.imodal-enter-from .imodal-overlay,
.imodal-leave-to .imodal-overlay {
  opacity: 0;
}
.imodal-enter-active .imodal-overlay,
.imodal-leave-active .imodal-overlay {
  transition: opacity 200ms ease;
}

/* panel scale+fade */
.imodal-enter-from .imodal-panel,
.imodal-leave-to .imodal-panel {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
.imodal-enter-active .imodal-panel,
.imodal-leave-active .imodal-panel {
  transition: opacity 200ms ease, transform 200ms ease;
}
</style>
