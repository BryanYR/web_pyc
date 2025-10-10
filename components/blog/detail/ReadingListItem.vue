<template>
  <NuxtLink :to="to" class="flex gap-4 items-start rounded-xl hover:bg-primary-50/60 dark:hover:bg-primary-700/30 p-2 transition">
    <img :src="post.image" :alt="post.title" class="h-20 w-28 rounded-lg object-cover" />
    <div class="flex-1">
      <h4 class="text-sm font-semibold text-primary-700 dark:text-white line-clamp-2">{{ post.title }}</h4>
      <p class="text-xs text-gray-600 dark:text-white/80 line-clamp-2 mt-1">{{ post.excerpt }}</p>
    </div>
  </NuxtLink>
  
</template>

<script setup lang="ts">
import type { BlogPost } from '@/composables/useBlogPosts'
const props = defineProps<{ post: BlogPost; to: string }>()
</script>
