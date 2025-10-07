<script setup lang="ts">
import SectionInformation from "@/components/utils/SectionInformation.vue";
</script>

<template>
  <section id="aboutUs" class="bg-white dark:bg-primary-900 py-8 md:pt-16 px-10">
    <div class="pyc-container-section mx-auto grid md:grid-cols-2 gap-6">
      <SectionInformation
        :hint="$t('aboutUs.about.hint')"
        :title="$t('aboutUs.about.title')"
        mode="block"
        class-description="text-justify"
      >
        <p>{{ $t("aboutUs.about.description") }}</p>
      </SectionInformation>
      <div class="p-4">
        <div class="relative rounded-tr-2xl rounded-bl-2xl h-[18.75rem] bg-cover bg-center" style="background-image: url('/images/about_us/office.webp')">
          <div class="absolute rounded-tr-2xl rounded-bl-2xl top-0 left-0 w-full h-full bg-primary-1000 opacity-75 z-10"></div>
          <div class="flex flex-col w-full h-full justify-center items-center text-white z-20 relative md:p-8 text-center">
            <h2 class="text-2xl">{{ $t('aboutUs.about.title_image') }}</h2>
            <h2 class="text-2xl">{{ $t('aboutUs.about.title_image_p2') }}</h2>
            <p class="mb-0 text-sm mt-2">{{ $t('aboutUs.about.subtitle_image') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
