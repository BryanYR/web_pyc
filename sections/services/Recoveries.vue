<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionInformation from "@/components/utils/SectionInformation.vue"
import { recoveriesIcon } from '@/constants/services'

const { t } = useI18n()

const recoveriesKeyMap: Record<string, string> = {
  recoveries_1: 'recoveries',
  recoveries_2: 'salvage',
}

const rawInfo = computed(() => {
  return recoveriesIcon.map((item) => {
    const subKey = recoveriesKeyMap[item.key] || item.key
    return {
      key: item.key,
      icon: markRaw(item.icon),
      title: t(`services.recoveries_salvage.${subKey}.title`),
    }
  })
})

const infoRecoveries = ref(rawInfo)
</script>

<template>
  <section id="prevention" class=" py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto grid md:grid-cols-2 gap-6">
      <SectionInformation
        :hint="$t('services.recoveries_salvage.hint')"
        :title="$t('services.recoveries_salvage.title')"
        mode="block"
        class-description="!font-normal"
      >
      </SectionInformation>
      <div>
        <div class="grid grid-cols-1  gap-4">
          <div
            v-for="item in infoRecoveries"
            :key="item.key"
            class="flex items-center gap-4 px-4 py-6 rounded-lg shadow-sm bg-white"
          >
            <component :is="item.icon" class="w-12 h-12 md:w-16 md:h-16 text-primary-700 shrink-0" />
            <div class="text-sm font-medium text-gray-800">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
