<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'primary',
})
import BannerPost from '@/sections/blog/BannerPost.vue'
import GridPosts from '@/sections/blog/GridPosts.vue'
</script>

<template>
  <div class="w-full pt-20">
    <BannerPost image-src="/images/divisions/division3.webp" />
    <GridPosts />
  </div>
</template>
