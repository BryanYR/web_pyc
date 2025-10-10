<template>
  <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-white/80">
    <img :src="author.avatar" :alt="author.name" class="h-8 w-8 rounded-full object-cover ring-1 ring-black/5" />
    <span class="font-medium">{{ author.name }}</span>
    <span>•</span>
    <time :datetime="dateISO">{{ prettyDate }}</time>
    <span>•</span>
    <span>{{ readTime }} min</span>
  </div>
  
</template>

<script setup lang="ts">
const props = defineProps<{ author: { name: string; avatar: string }; dateISO: string; readTime: number }>()

const prettyDate = computed(() => {
  const d = new Date(props.dateISO)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
})
</script>
