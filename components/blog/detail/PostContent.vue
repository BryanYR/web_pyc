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
