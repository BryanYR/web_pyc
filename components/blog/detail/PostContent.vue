<template>
  <div class="post-content max-w-none leading-relaxed">
    <div ref="contentRef" v-html="content"></div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps<{ content: string }>()
const contentRef = ref<HTMLElement | null>(null)

function wrapTables() {
  if (!contentRef.value) return
  
  const tables = contentRef.value.querySelectorAll('table')
  tables.forEach((table) => {
    // Check if already wrapped
    if (table.parentElement?.classList.contains('table-responsive')) return
    
    // Create wrapper
    const wrapper = document.createElement('div')
    wrapper.className = 'table-responsive'
    
    // Wrap the table
    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })
}

onMounted(() => {
  nextTick(() => wrapTables())
})

watch(() => props.content, () => {
  nextTick(() => wrapTables())
})
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
  border-radius: 20px;
  padding: 10px 0;
}
.post-content :deep(ol) {
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 1.5rem;
  margin: 0.75rem 0 0.75rem 0.25rem;
}
.post-content :deep(li) {
  margin: 0.25rem 0; /* space between items */
  font-size: 18px;
  color: #191d22 !important;
}
/* Nested list types for better readability */
.post-content :deep(ul ul) { list-style-type: circle; }
.post-content :deep(ul ul ul) { list-style-type: square; }

.post-content :deep(p){
  font-size: 18px;
  color: #191d22 !important;
  margin-bottom: 1em;
}
.dark .post-content :deep(p),
.dark .post-content :deep(span),
.dark .post-content :deep(li){
  color: #e4e6eb !important;
}

/* Remove margin-bottom from paragraphs containing images */
.post-content :deep(p:has(img)) {
  margin-bottom: 0;
}

/* Table responsive wrapper */
.post-content :deep(.table-responsive) {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin: 1.5rem 0;
}

.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  display: table;
  table-layout: auto;
}

/* Table cell borders and spacing */
.post-content :deep(th),
.post-content :deep(td) {
  border: 1px solid #d3d4d8;
  padding: 0.75rem .5rem;
  vertical-align: top;
  font-size: 14px;
  text-align: left;
  word-wrap: break-word;
}

/* Optional: subtle header background */
.post-content :deep(thead th) {
  background-color: #f8fafc;
  font-weight: 600;
    position: sticky;
}

/* Dark mode */
.dark .post-content :deep(.table-responsive) {
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
}

.dark .post-content :deep(table) {
  background: #1f2937;
}

.dark .post-content :deep(th),
.dark .post-content :deep(td) {
  border-color: #4b5563;
}

.dark .post-content :deep(thead th) {
  background-color: #374151;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .post-content :deep(th),
  .post-content :deep(td) {
    font-size: 16px;
    padding: 0.75rem 1rem;
  }
}
</style>
