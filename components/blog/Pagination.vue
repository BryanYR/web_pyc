<script setup lang="ts">
const Arrow = defineAsyncComponent(() => import('@/assets/icons/Arrow.vue'))
const props = defineProps<{ page: number; total: number; perPage: number }>()
const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
</script>
<template>
  <nav class="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
    <button
      class="rounded-full border px-2 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:bg-slate-300"
      :disabled="page <= 1"
      aria-label="button_left"
      @click="$emit('update:page', page - 1)"
    >
      <Arrow left />
    </button>

    <span class="px-2 text-sm text-black/90 font-semibold ">{{ page }} / {{ totalPages }}</span>

    <button
      class="rounded-full border px-2 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:bg-slate-300"
      :disabled="page >= totalPages"
      aria-label="button_right"
      @click="$emit('update:page', page + 1)"
    >
      <Arrow right />
    </button>
  </nav>
</template>
