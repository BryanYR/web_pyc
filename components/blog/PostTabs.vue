<template>
  <div class="flex items-center justify-between text-center gap-8 border-b border-gray-200" >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      @click="$emit('update:modelValue', tab.value)"
      class="relative -mb-px pb-3 text-lg font-medium transition w-full"
      :class="modelValue === tab.value ? 'text-sky-700 dark:text-white' : 'text-gray-500 dark:text-white/80 hover:text-gray-700'"
    >
      {{ tab.label }}
      <span
        class="absolute left-0 bottom-0 h-0.5 w-full"
        :class="modelValue === tab.value ? 'bg-sky-700' : 'bg-transparent'"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  tabs: { label: string; value: string }[]
}>()
</script>
