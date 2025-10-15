<template>
  <div class="prose max-w-none prose-p:text-gray-700 dark:prose-invert">
    <p v-html="content" class="leading-relaxed"></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<style>
/* optional refinements for dark mode */
</style>
