<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'white',
})
import BannerPost from '@/sections/blog/BannerPost.vue'
import GridPosts from '@/sections/blog/GridPosts.vue'

// SEO and performance optimization
useHead({
  title: 'Blog - PYC Prevención y Control',
  meta: [
    { name: 'description', content: 'Lee nuestros artículos sobre prevención, control y seguridad laboral' },
    { property: 'og:title', content: 'Blog - PYC Prevención y Control' },
    { property: 'og:description', content: 'Lee nuestros artículos sobre prevención, control y seguridad laboral' },
    { property: 'og:image', content: '/images/home/web_pyc_blog.webp' },
  ],
  link: [
    { rel: 'preconnect', href: (import.meta as any).env?.VITE_API_BASE_URL || '' },
  ]
})
</script>

<template>
  <div class="w-full pt-20">
    <BannerPost image-src="/images/home/web_pyc_blog.webp" />
    <GridPosts />
  </div>
</template>
