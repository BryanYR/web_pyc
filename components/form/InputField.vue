<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: string | number
  label: string
  id?: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  autocomplete?: string
  toggleVisibility?: boolean // only applies when type === 'password'
  containerClass?: string
  inputClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  toggleVisibility: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'focus', ev: FocusEvent): void
}>()

const localId = `if-${Math.random().toString(36).slice(2, 8)}`
const inputId = computed(() => props.id || localId)
const showPassword = ref(false)

const resolvedType = computed(() => {
  if (props.type === 'password' && props.toggleVisibility) {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div :class="['w-full', containerClass]">
    <label :for="inputId" class="block text-sm font-medium mb-1">{{ label }}</label>
    <div class="relative">
      <input
        :id="inputId"
        :type="resolvedType"
        class="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary-700 disabled:opacity-60 disabled:cursor-not-allowed"
        :class="inputClass"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="onInput"
        @blur="(e) => $emit('blur', e)"
        @focus="(e) => $emit('focus', e)"
      />
      <!-- Password toggle -->
      <button
        v-if="type === 'password' && toggleVisibility"
        type="button"
        class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
        @click="showPassword = !showPassword"
        :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      >
        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path d="M2.1 3.51L3.51 2.1l18.39 18.39-1.41 1.41-2.54-2.54C15.92 20.29 14.02 21 12 21 5 21 1 14 1 14s1.58-2.68 4.6-4.96L2.1 3.51zM12 7a5 5 0 00-5 5c0 .7.15 1.36.41 1.95l1.53-1.53A3 3 0 1113.58 9l1.5-1.5A4.98 4.98 0 0012 7z"/>
        </svg>
      </button>
    </div>
  </div>
  
</template>
