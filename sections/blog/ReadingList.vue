<template>
  <aside>
    <h3 class="text-lg font-semibold text-primary-700 dark:text-white mb-3">{{ title }}</h3>
    <div class="space-y-3">
      <ReadingListItem
        v-for="p in items"
        :key="p.id"
        :post="p"
        :to="`/blog/${p.id}`"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import ReadingListItem from '@/components/blog/detail/ReadingListItem.vue'
import type { BlogPost } from '@/composables/useBlogPosts'

defineProps<{ title?: string; items: BlogPost[] }>()
</script>
