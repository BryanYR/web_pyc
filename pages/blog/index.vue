<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'white',
})
import BannerPost from '@/sections/blog/BannerPost.vue'
import GridPosts from '@/sections/blog/GridPosts.vue'
</script>

<template>
  <div class="w-full pt-20">
    <BannerPost image-src="/images/home/web_pyc_blog.webp" />
    <GridPosts />
  </div>
</template>
