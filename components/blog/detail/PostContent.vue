<template>
  <div class="post-content max-w-none leading-relaxed">
    <div v-html="content"></div>
  </div>
  
</template>

<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<style scoped>

/* Ensure lists from rich HTML keep bullets/numbers and indentation */
.post-content :deep(ul) {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 1.5rem; /* indentation */
  margin: 0.75rem 0 0.75rem 0.25rem; /* vertical spacing + slight left */
}

/* Images inside paragraphs: centered and full-width */
.post-content :deep(p img),
.post-content :deep(p a img) {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
.post-content :deep(ol) {
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 1.5rem;
  margin: 0.75rem 0 0.75rem 0.25rem;
}
.post-content :deep(li) {
  margin: 0.25rem 0; /* space between items */
}
/* Nested list types for better readability */
.post-content :deep(ul ul) { list-style-type: circle; }
.post-content :deep(ul ul ul) { list-style-type: square; }

/* Quill large text size: bigger and responsive */
.post-content :deep(p .ql-size-huge) {
  font-size: clamp(2rem, 6vw, 3rem);
  line-height: 1.2;
}
.post-content :deep(p span .ql-size-huge) {
  font-size: clamp(2rem, 6vw, 3rem);
  line-height: 1.2;
}
</style>
