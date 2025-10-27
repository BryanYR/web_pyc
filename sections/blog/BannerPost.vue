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
  <section class="relative overflow-hidden bg-[#0B5DA7] lg:h-[18rem] 2xl:h-[24rem] py-8 lg:py-0">
    <div
      class="pointer-events-none hidden lg:block absolute left-0 top-0 z-10 h-full w-[68%] -skew-x-[25deg] origin-top-right bg-primary-800"
    ></div>
    <div class="hidden lg:block absolute top-0 right-0 z-0">
      <img
        :src="imageSrc"
        alt="banner"
        class="w-full h-auto max-h-[18rem] 2xl:max-h-[28rem] rounded-md object-cover origin-center"
      />
    </div>
    <div class="pyc-container-section mx-auto px-6 h-full flex justify-center z-20 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left max-w-6xl">
        <div class="text-white w-full">
          <div class="max-w-xl mx-auto lg:mx-0">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {{ $t('blog.banner.title') }}
            </h1>
            <span class="mt-4 text-white/90 text-xl lg:text-2xl w-full block">
              {{ $t('blog.banner.subtitle') }}
            </span>
            <span v-if="hasSubtitle2" class="text-white/90 text-xl lg:text-2xl w-full block">
              {{ $t('blog.banner.subtitle2') }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- angled shape -->
    
  </section>
</template>
