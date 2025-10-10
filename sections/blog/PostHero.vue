<template>
  <section>
    <!-- Mobile: full-bleed image on top -->
    <div class="sm:hidden">
      <img :src="image" :alt="title" class="h-56 w-full object-cover" />
    </div>

    <div class="container mx-auto px-6">
      <!-- Title and meta -->
      <div class="mx-auto max-w-3xl sm:max-w-4xl lg:max-w-6xl">
        <div class="py-6 sm:py-8">
          <span v-if="tag" class="inline-block rounded-full bg-primary-100 text-primary-700 text-xs px-3 py-1 mb-3">{{ tag }}</span>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-700 dark:text-white">{{ title }}</h1>
          <div class="mt-4">
            <PostMetaBar :author="author" :dateISO="date" :readTime="readTime" />
          </div>
        </div>
      </div>
    </div>

    <!-- Tablet/Desktop: side-by-side image -->
    <div class="hidden sm:block">
      <div class="container mx-auto px-6">
        <div class="mx-auto max-w-6xl">
          <div class="overflow-hidden rounded-2xl bg-white dark:bg-primary-700 shadow ring-1 ring-black/5 grid sm:grid-cols-5">
            <div class="sm:col-span-3">
              <img :src="image" :alt="title" class="h-full w-full object-cover max-h-[420px]">
            </div>
            <div class="sm:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
              <h2 class="text-xl sm:text-2xl font-semibold text-primary-700 dark:text-white">{{ title }}</h2>
              <p v-if="excerpt" class="mt-3 text-gray-600 dark:text-white/80">{{ excerpt }}</p>
              <div class="mt-4">
                <PostMetaBar :author="author" :dateISO="date" :readTime="readTime" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PostMetaBar from '@/components/blog/detail/PostMetaBar.vue'

defineProps<{
  title: string
  excerpt?: string
  image: string
  date: string
  readTime: number
  author: { name: string; avatar: string }
  tag?: string
}>()
</script>
