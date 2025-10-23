<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  headerBg: 'primary',
})
import BannerContactUs from '@/sections/contact-us/BannerContactUs.vue'
import FormContactUs from '@/sections/contact-us/FormContactUs.vue';
</script>
<template>
  <div class="w-full pt-20">
    <BannerContactUs image-src="/images/about_us/office.webp" />
    <FormContactUs />
  </div>
</template>

