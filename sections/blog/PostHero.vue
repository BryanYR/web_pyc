<script setup lang="ts">
import { computed } from 'vue'
import PostMetaBar from '@/components/blog/detail/PostMetaBar.vue'
import { isValidUrlFormat } from '@/utils/general'
import Breadcrumb from '@/components/utils/Breadcrumb.vue'
import type { BlogListItem } from '@/interfaces/blog'

const { post, readTime, author, breadcrumbs } = defineProps<{
  post: Pick<BlogListItem, 'title' | 'shortDescription' | 'imageUrl' | 'created_at'>
  readTime: number
  author: { name: string; avatar: string }
  breadcrumbs?: Array<{ label: string; to?: string }>
}>()

const validImage = computed(() => isValidUrlFormat(post.imageUrl))
</script>

<template>
  <section>
    <!-- Mobile: full-bleed image on top -->
    <div class="w-full">
      <template v-if="validImage">
        <img :src="post.imageUrl as string" :alt="post.title" class="h-56 w-full object-cover" />
      </template>
      <div v-else class="h-56 w-full bg-primary-800 flex items-center justify-center">
        <img src="/images/logos/pyc_logo.svg" alt="PYC" class="h-10 opacity-90" />
      </div>
    </div>

    <div class="container mx-auto px-6">
      <!-- Title and meta -->
      <div class="mx-auto max-w-3xl sm:max-w-4xl lg:max-w-6xl">
        <div class="py-6 sm:py-8">
          <div v-if="breadcrumbs && breadcrumbs.length" class="mb-2">
            <Breadcrumb :items="breadcrumbs" />
          </div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-700 dark:text-white">{{ post.title }}</h1>
          <p v-if="post.shortDescription" class="mt-3 text-gray-600 dark:text-white/80">{{ post.shortDescription }}</p>
          <div class="mt-4">
            <PostMetaBar :author="author" :dateISO="post.created_at" :readTime="readTime" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>