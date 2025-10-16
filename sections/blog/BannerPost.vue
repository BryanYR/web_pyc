<template>
  <section class="relative overflow-hidden bg-[#0B5DA7]">
    <div
      class="pointer-events-none hidden lg:block absolute left-0 top-0 z-10 h-full w-[60%] -skew-x-[25deg] origin-top-right bg-primary-800"
    ></div>
    <div class="hidden lg:block absolute top-0 right-0 z-0">
      <img
        :src="imageSrc"
        alt="banner"
        class="w-full h-auto rounded-md object-cover transform scale-x-[-1] origin-center"
      />
    </div>
    <div class="pyc-container-section mx-auto px-6 py-12 md:py-16 lg:py-20 z-20 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left">
        <div class="text-white">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {{ $t('blog.banner.title') }}
          </h1>
          <p class="mt-4 text-white/90 max-w-xl">
            {{ $t('blog.banner.subtitle') }}
          </p>
        </div>
      </div>
    </div>
    <!-- angled shape -->
    
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ imageSrc?: string }>()
</script>
