<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'primary',
})
import AboutUs from '@/sections/about-us/AboutUs.vue'
import Certification from '@/sections/about-us/Certification.vue';
import Alliance from '@/sections/about-us/Alliance.vue';
import BannerAdjusters from '@/sections/about-us/BannerAdjusters.vue';
import OurValues from '@/sections/about-us/OurValues.vue';
import OurNumbers from '@/sections/about-us/OurNumbers.vue';
</script>

<template>
  <div class="w-full pt-20">
    <AboutUs />
    <Certification />
    <Alliance />
    <BannerAdjusters />
    <OurValues />
    <OurNumbers />
  </div>
</template>
