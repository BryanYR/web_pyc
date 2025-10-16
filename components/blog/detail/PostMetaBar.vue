<template>
  <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-white/80">
    <template v-if="author.avatar">
      <img
        :src="author.avatar"
        :alt="author.name"
        class="h-8 w-8 rounded-full object-cover ring-1 ring-black/5"
      />
    </template>
    <template v-else>
      <div
        class="h-8 w-8 rounded-full bg-primary-700 text-white flex items-center justify-center ring-1 ring-black/5 uppercase"
      >
        {{ initial }}
      </div>
    </template>
    <div class="w-full flex flex-col gap-1">
      <span class="font-medium">{{ author.name }}</span>
      <div class="w-full flex gap-2">
        <span>Lectura de: {{ readTime }} min</span>
        <span>•</span>
        <time :datetime="dateISO">{{ prettyDate }}</time>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  author: { name: string; avatar?: string | null }
  dateISO: string
  readTime: number
}>()

const prettyDate = computed(() => {
  const d = new Date(props.dateISO)
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const initial = computed(() => {
  const name = (props.author.name || '').trim()
  if (!name) return '?'
  // Take first letter of first word; could be extended to multiple initials if needed
  return name.charAt(0).toUpperCase()
})
</script>
