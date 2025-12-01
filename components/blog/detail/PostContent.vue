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
<template>
  <div class="post-content max-w-none leading-relaxed">
    <div ref="contentRef" v-html="content"></div>
  </div>
  
</template>
<style global>
.post-content ul {
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 1.5rem;
  margin: 0.75rem 0 0.75rem 0.25rem;
}

/* Images inside paragraphs: centered and full-width */
.post-content p img,
.post-content p a img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  padding: 10px 0;
}

.post-content ol {
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 1.5rem;
  margin: 0.75rem 0 0.75rem 0.25rem;
}

.post-content li {
  margin: 0.25rem 0;
  font-size: 18px;
  color: #191d22 !important;
}

/* Nested list types for better readability */
.post-content ul ul { list-style-type: circle; }
.post-content ul ul ul { list-style-type: square; }

.post-content p {
  font-size: 18px;
  color: #191d22 !important;
  margin-bottom: 1em;
}

/* Dark mode text colors */
.dark .post-content p,
.dark .post-content span,
.dark .post-content li {
  color: #e4e6eb !important;
}

/* Remove margin-bottom from paragraphs containing images */
.post-content p:has(img) {
  margin-bottom: 0;
}

/* Table responsive wrapper */
.post-content .table-responsive {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin: 1.5rem 0;
}

.post-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  display: table;
  table-layout: auto;
}

/* Table cell borders and spacing */
.post-content th,
.post-content td {
  border: 1px solid #d3d4d8;
  padding: 0.75rem 0.5rem;
  vertical-align: top;
  font-size: 14px;
  text-align: left;
  word-wrap: break-word;
}

/* Optional: subtle header background */
.post-content thead th {
  background-color: #f8fafc;
  font-weight: 600;
  position: sticky;
}

/* Dark mode table styles */
.dark .post-content .table-responsive {
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
}

.dark .post-content table {
  background: #1f2937;
}

.dark .post-content th,
.dark .post-content td {
  border-color: #4b5563;
}

.dark .post-content thead th {
  background-color: #374151;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .post-content th,
  .post-content td {
    font-size: 16px;
    padding: 0.75rem 1rem;
  }
}
</style>