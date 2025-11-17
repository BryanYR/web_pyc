<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'primary',
})
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import PostHero from '@/sections/blog/PostHero.vue'
import PostContent from '@/components/blog/detail/PostContent.vue'
import { getPost } from '@/api/blogs'
import type { BlogEntity } from '@/interfaces/blog'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const blog = ref<BlogEntity | null>(null)
const loading = ref(false)
const { locale } = useI18n()

const isSpanish = computed(() => locale.value?.startsWith('es'))
const displayTitle = computed(() => {
  const b = blog.value
  if (!b) return ''
  if (isSpanish.value) return b.title
  return b.title_en ?? b.title
})

const displayShortDescription = computed(() => {
  const b = blog.value
  if (!b) return ''
  if (isSpanish.value) return b.shortDescription
  return b.shortDescription_en ?? b.shortDescription
})

const displayContent = computed(() => {
  const b = blog.value
  if (!b) return ''
  if (isSpanish.value) return b.content
  return b.content_en ?? b.content
})

function estimateReadTime(text: string) {
  const words = (text || '')
    .replaceAll(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
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

// SEO Meta tags
watch([blog, displayTitle, displayShortDescription], () => {
  if (blog.value) {
    useHead({
      title: displayTitle.value || 'Blog - PYC',
      meta: [
        { name: 'description', content: displayShortDescription.value || 'Lee nuestro artículo sobre prevención y control' },
        { property: 'og:title', content: displayTitle.value || 'Blog - PYC' },
        { property: 'og:description', content: displayShortDescription.value || 'Lee nuestro artículo sobre prevención y control' },
        { property: 'og:image', content: blog.value?.imageUrl || '' },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: displayTitle.value || 'Blog - PYC' },
        { name: 'twitter:description', content: displayShortDescription.value || 'Lee nuestro artículo sobre prevención y control' },
        { name: 'twitter:image', content: blog.value?.imageUrl || '' },
      ]
    })
  }
})

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
  <div class="w-full pt-28 sm:pt-20">
    <template v-if="loading">
      <section class="container mx-auto px-6">
        <div class="mx-auto max-w-3xl 2xl:max-w-4xl py-6 sm:py-8">
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
        title: displayTitle,
        shortDescription: displayShortDescription,
        imageUrl: blog.imageUrl,
        created_at: blog.datePublished || blog.created_at
      }"
      :readTime="estimateReadTime(displayContent)"
      :fullContent="displayContent"
      :author="{ name: blog.author ?? 'PYC', avatar: '' }"
      :breadcrumbs="[
        { label: 'Blog', to: '/blog' },
        { label: displayTitle }
      ]"
    />

    <section class="container mx-auto px-6 py-8 lg:pb-16">
      <div class="mx-auto max-w-3xl 2xl:max-w-4xl grid gap-8">
        <div class="w-full">
          <div v-if="loading" class="space-y-3 animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-11/12"></div>
            <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <PostContent v-else-if="blog" :content="displayContent" />
        </div>
      </div>
    </section>
  </div>
</template>
