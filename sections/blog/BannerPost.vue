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
  <section class="relative overflow-hidden bg-[#0B5DA7] lg:h-[18rem] xl:h-[19rem] py-8 lg:py-0 mt-2">
    <!-- Background image volteado como espejo (solo md+) -->
    <div
      v-if="imageSrc"
      class="hidden lg:block absolute inset-0 bg-right bg-no-repeat bg-cover"
      :style="`background-image: url('${imageSrc}'); background-position: left center;`"
    ></div>
    
    <div class="pyc-container-section mx-auto px-6 w-full  h-full z-20 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left max-w-6xl h-full mx-auto">
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
