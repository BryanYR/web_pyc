<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type Primitive = string | number

interface Option<T extends Primitive = Primitive> {
  label: string
  value: T
}

interface Props<T extends Primitive = Primitive> {
  modelValue: T | null
  label?: string
  id?: string
  options: Option<T>[]
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecciona una opción',
  disabled: false,
})

const emit =
  defineEmits<(e: 'update:modelValue', v: Primitive | null) => void>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find(
    (o) => String(o.value) === String(props.modelValue)
  )
  return found ? found.label : props.placeholder
})

const isEmpty = computed(
  () =>
    props.modelValue === null ||
    props.modelValue === undefined ||
    props.modelValue === ''
)

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}

function selectValue(v: Primitive) {
  emit('update:modelValue', v)
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (!root.value) return
  if (!root.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium mb-1">{{
      label
    }}</label>
    <div ref="root" class="relative inline-block w-full text-left">
      <button
        :id="id"
        type="button"
        class="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md border bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary-700 disabled:opacity-60"
        :aria-expanded="open"
        :disabled="disabled"
        @click="toggle"
      >
        <span class="text-sm truncate" :class="{ 'text-gray-400': isEmpty }">{{
          selectedLabel
        }}</span>
        <svg
          class="w-4 h-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <transition name="fade">
        <div
          v-if="open"
          class="absolute mt-2 w-full bg-white text-gray-900 rounded-lg shadow-lg z-50 max-h-60 overflow-auto"
          role="menu"
          aria-orientation="vertical"
        >
          <button
            v-for="opt in options"
            :key="String(opt.value)"
            class="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            :class="
              String(opt.value) === String(props.modelValue)
                ? 'bg-gray-50 font-medium'
                : ''
            "
            @click="selectValue(opt.value)"
            role="menuitem"
          >
            {{ opt.label }}
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
