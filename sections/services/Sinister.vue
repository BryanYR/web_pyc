<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionInformation from '@/components/utils/SectionInformation.vue'
import { sinisterIcon } from '@/constants/services'

const { t } = useI18n()

const sinisterKeyMap: Record<string, string> = {
  sinister_1: 'civil_liability',
  sinister_2: 'general_risks',
  sinister_3: 'transport',
}

const rawInfo = computed(() => {
  return sinisterIcon.map((item) => {
    const subKey = sinisterKeyMap[item.key] || item.key
    return {
      key: item.key,
      icon: markRaw(item.icon),
      title: t(`services.sinister.${subKey}.title`),
    }
  })
})

const infoSinister = ref(rawInfo)
</script>

<template>
  <section id="prevention" class="bg-primary-700 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto grid md:grid-cols-2 gap-6">
      <SectionInformation
        :hint="$t('services.sinister.hint')"
        :title="$t('services.sinister.title')"
        mode="block"
        class-description="!font-normal !text-white"
        class-title="!text-white !border-white"
        class-hint="!text-white"
      >
        <p>{{ $t('services.sinister.description') }}</p>
      </SectionInformation>
      <div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            v-for="item in infoSinister"
            :key="item.key"
            class="flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-white/10 md:transition-transform md:duration-300 md:hover:scale-105"
          >
            <component :is="item.icon" class="w-12 h-12 md:w-16 md:h-16 text-white" />
            <div class="text-lg font-semibold text-white">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
