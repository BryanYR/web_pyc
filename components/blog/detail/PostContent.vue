<template>
  <div class="prose max-w-none prose-p:text-gray-700 dark:prose-invert">
    <p v-for="(p, i) in paragraphs" :key="i" class="leading-relaxed">
      {{ p }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ content: string }>()
const paragraphs = computed(() => props.content.split(/\n\n+/).filter(Boolean))
</script>

<style>
/* optional refinements for dark mode */
</style>
