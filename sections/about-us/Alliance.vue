<script setup lang="ts">
import SectionInformation from "@/components/utils/SectionInformation.vue";
</script>

<template>
  <section id="alliance" class="bg-primary-700 dark:bg-primary-900  py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto grid md:grid-cols-2 gap-6">
      <SectionInformation
        :hint="$t('aboutUs.alliance.hint')"
        :title="$t('aboutUs.alliance.title')"
        mode="block"
        class="md:col-span-2"
        class-title="!text-white !border-white"
        class-hint="!text-white"
      >
        
      </SectionInformation>
      <div class="!text-white">
        <p class="mb-0 font-light text-justify">{{ $t("aboutUs.alliance.description") }}</p>
        <p class="pt-4 font-bold">"{{ $t("aboutUs.alliance.phrase") }}"</p>
      </div>
      <div class="flex gap-2 items-center">
        <img src="/images/about_us/Ricardo_spinoza.webp" alt="Ricardo_spinoza" loading="lazy" class="object-cover rounded-full w-40 h-40 border-4 border-white">
        <div class="flex flex-col gap-2 text-white">
            <p class="font-semibold">{{ $t("aboutUs.alliance.ceo.name") }}</p>
            <p>{{ $t("aboutUs.alliance.ceo.position") }}</p>
            <p class="mt-2 text-justify">{{ $t("aboutUs.alliance.ceo.experience") }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>
