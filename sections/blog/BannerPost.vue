<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ imageSrc?: string }>()

const { t, te } = useI18n()
const hasSubtitle2 = computed(() => {
  try {
    return typeof te === 'function'
      ? te('blog.banner.subtitle2')
      : t('blog.banner.subtitle2') !== 'blog.banner.subtitle2'
  } catch {
    return false
  }
})
</script>
<template>
  <section
    class="relative overflow-hidden bg-[#0B5DA7] h-[320px] md:h-[280px] lg:h-[320px] xl:h-[340px]"
  >
    <!-- Imagen de fondo a la derecha (visible solo en md+) -->
    <div v-if="imageSrc" class="hidden lg:block absolute inset-0 w-full h-full">
      <img
        :src="imageSrc"
        alt="Banner background"
        class="w-full h-full object-cover object-center"
      />
    </div>

    <!-- Overlay diagonal azul por encima de la imagen -->
    <div
      class="absolute inset-0 w-full h-full bg-[#0B5DA7] origin-top-right"
      style="clip-path: polygon(0 0, 65% 0, 48% 100%, 0% 100%)"
    ></div>

    <!-- Contenido de texto -->
    <div
      class="pyc-container-section mx-auto px-6 h-full flex items-center relative z-10"
    >
      <div class="w-full max-w-6xl mx-auto">
        <div class="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1
            class="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
          >
            {{ $t('blog.banner.title') }}
          </h1>
          <p
            class="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed"
          >
            {{ $t('blog.banner.subtitle') }}
          </p>
          <p
            v-if="hasSubtitle2"
            class="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed mt-2"
          >
            {{ $t('blog.banner.subtitle2') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
