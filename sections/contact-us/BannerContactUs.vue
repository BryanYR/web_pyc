<script setup lang="ts">
import { computed } from 'vue'
import SectionTitle from '@/components/utils/SectionTitle.vue'

const props = defineProps<{ imageSrc?: string }>()
const bgStyle = computed(() =>
  props.imageSrc ? { backgroundImage: `url(${props.imageSrc})` } : {}
)
</script>
<template>
  <section
    class="relative overflow-hidden bg-[#0B5DA7] h-[20rem] md:h-[28rem] bg-no-repeat bg-cover bg-center"
    :style="bgStyle"
  >
    <div class="pointer-events-none absolute left-0 top-0 z-10 h-full w-full bg-primary-800/60"></div>
    <div class="pyc-container-section mx-auto px-6 z-20 relative h-full">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end text-center lg:text-left h-full"
      >
        <SectionTitle :title="$t('contactUs.banner.title')" class="pb-20" class-title="!text-white" />
      </div>
    </div>
  </section>
</template>
