<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ imageSrc?: string }>()

const { t, te } = useI18n()
const hasSubtitle2 = computed(() => {
  try {
    return typeof te === 'function' ? te('blog.banner.subtitle2') : t('blog.banner.subtitle2') !== 'blog.banner.subtitle2'
  } catch {
    return false
  }
})
</script>
<template>
  <section class="relative overflow-hidden bg-[#0B5DA7] lg:h-[18rem] xl:h-[20rem] 2xl:h-[22rem] py-8 lg:py-0">
    <div
      class="pointer-events-none hidden lg:block absolute left-0 top-0 z-10 h-full w-[68%] -skew-x-[25deg] origin-top-right bg-primary-700"
    ></div>
      <!-- Image area constrained to right half for consistent cross-browser sizing -->
      <div class="hidden lg:block absolute inset-y-0 right-0 w-1/2 z-0">
        <img
          :src="imageSrc"
          alt="banner"
          class="w-full h-full rounded-md object-cover"
        />
      </div>
    <div class="pyc-container-section mx-auto px-6 h-full flex justify-center z-20 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left max-w-6xl h-full">
        <div class="text-white w-full">
          <div class="max-w-xl mx-auto lg:mx-0">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight my-0">
              {{ $t('blog.banner.title') }}
            </h1>
            <span class="mt-4 text-white/90 text-base md:text-xl xl:text-2xl w-full block">
              {{ $t('blog.banner.subtitle') }}
            </span>
            <span v-if="hasSubtitle2" class="text-white/90 text-base md:text-xl xl:text-2xl w-full block">
              {{ $t('blog.banner.subtitle2') }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- angled shape -->
    
  </section>
</template>
