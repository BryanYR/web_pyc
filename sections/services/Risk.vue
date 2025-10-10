<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionInformation from '@/components/utils/SectionInformation.vue'
import { riskManagementIcon } from '@/constants/services'

const { t } = useI18n()

const riskKeyMap: Record<string, string> = {
  management_1: 'supply_chain',
  management_2: 'transport_security',
  management_3: 'operational_risk',
  management_4: 'fire_theft',
}

const rawInfo = computed(() => {
  return riskManagementIcon.map((item) => {
    const subKey = riskKeyMap[item.key] || item.key
    return {
      key: item.key,
      icon: markRaw(item.icon),
      title: t(`services.risk_management.${subKey}.title`),
    }
  })
})

const infoRisk = ref(rawInfo)
</script>

<template>
  <section id="prevention" class="bg-primary-700 dark:bg-primary-900 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto grid md:grid-cols-2 gap-6">
      <SectionInformation
        :hint="$t('services.risk_management.hint')"
        :title="$t('services.risk_management.title')"
        mode="block"
        class-description="!font-normal !text-white "
        class-title="!text-white !border-white"
        class-hint="!text-white"
      >
        <p>{{ $t('services.risk_management.description') }}</p>
      </SectionInformation>
      <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div
            v-for="item in infoRisk"
            :key="item.key"
            class="flex flex-col items-center gap-4 p-4 rounded-lg shadow-sm bg-white/10 md:transition-transform md:duration-300 md:hover:scale-105"
          >
            <component :is="item.icon" class="w-12 h-12 md:w-16 md:h-16 text-white" />
            <div class="text-sm lg:text-base font-medium text-white">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
