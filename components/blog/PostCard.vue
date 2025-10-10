<template>
  <NuxtLink :to="`/blog/${post.id}`" class="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-primary-700 shadow-sm ring-1 ring-black/5 group">
    <img :src="post.image" :alt="post.title" class="h-44 w-full object-cover group-hover:brightness-95 transition" />
    <div class="p-5">
      <h3 class="text-primary-700 dark:text-white font-semibold text-lg">{{ post.title }}</h3>
      <p class="mt-2 text-sm text-gray-600 dark:text-white line-clamp-4">{{ post.excerpt }}</p>
      <div class="mt-4">
        <span class="inline-block rounded-full border border-primary-700/30 dark:border-white px-4 py-1.5 text-sm text-primary-700 dark:text-white group-hover:bg-primary-100 dark:group-hover:bg-primary-600 transition">Leer Nota</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
}
const props = defineProps<{ post: BlogPost }>()
</script>
