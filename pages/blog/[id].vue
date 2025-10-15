<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'primary',
})
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostHero from '@/sections/blog/PostHero.vue'
import PostContent from '@/components/blog/detail/PostContent.vue'
import { getPost } from '@/api/blogs'
import type { BlogEntity } from '@/interfaces/blog'

const route = useRoute()
const blog = ref<BlogEntity | null>(null)
const loading = ref(false)

function estimateReadTime(text: string) {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

async function load(id: string) {
  loading.value = true
  try {
    const res = await getPost(id)
    if (res.ok) {
      blog.value = res.data
    } else {
      blog.value = null
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = String(route.params.id)
  load(id)
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) load(String(newId))
  }
)
</script>

<template>
  <div class="w-full pt-20">
    <template v-if="loading">
      <section class="container mx-auto px-6">
        <div class="mx-auto max-w-3xl sm:max-w-4xl lg:max-w-6xl py-6 sm:py-8">
          <div class="h-4 w-40 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div class="h-8 w-3/4 bg-gray-200 rounded mb-3 animate-pulse"></div>
          <div class="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="hidden sm:block mx-auto max-w-6xl">
          <div class="rounded-2xl bg-gray-100 h-64 sm:h-72 w-full animate-pulse"></div>
        </div>
      </section>
    </template>
    <PostHero
      v-else-if="blog"
      :post="{
        title: blog.title,
        shortDescription: blog.shortDescription,
        imageUrl: blog.imageUrl,
        created_at: blog.datePublished || blog.created_at
      }"
      :readTime="estimateReadTime(blog.content)"
      :author="{ name: 'PYC', avatar: '' }"
      :breadcrumbs="[
        { label: 'Blog', to: '/blog' },
        { label: blog.title }
      ]"
    />

    <section class="container mx-auto px-6 py-8 lg:pb-16">
      <div class="mx-auto max-w-6xl grid lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8">
          <div v-if="loading" class="space-y-3 animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-11/12"></div>
            <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <PostContent v-else-if="blog" :content="blog.content" />
        </div>
      </div>
    </section>
  </div>
</template>
