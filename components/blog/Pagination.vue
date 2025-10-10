<template>
  <nav class="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
    <button
      class="rounded-md border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
      :disabled="page <= 1"
      @click="$emit('update:page', page - 1)"
    >
      Prev
    </button>

    <span class="px-2 text-sm text-gray-600">{{ page }} / {{ totalPages }}</span>

    <button
      class="rounded-md border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
      :disabled="page >= totalPages"
      @click="$emit('update:page', page + 1)"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{ page: number; total: number; perPage: number }>()
const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
</script>
