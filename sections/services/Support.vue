<script setup lang="ts">
import { markRaw, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionInformation from '@/components/utils/SectionInformation.vue'
import { supportIcon } from '@/constants/services'

const { t } = useI18n()

const supportKeyMap: Record<string, string> = {
  support_1: 'inspections',
  support_2: 'engineering',
  support_3: 'medical_auditing',
  support_4: 'logistics',
  support_5: 'technology',
  support_6: 'legal',
  support_7: 'criminalistics',
  support_8: 'forensic_accounting',
  support_9: 'spill_cleaning',
}

const rawInfo = computed(() => {
  return supportIcon.map((item) => {
    const subKey = supportKeyMap[item.key] || item.key
    return {
      key: item.key,
      icon: markRaw(item.icon),
      title: t(`services.support_units.${subKey}.title`),
    }
  })
})
const infoSupport = rawInfo
</script>

<template>
  <section id="prevention" class="bg-white dark:bg-primary-800 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-6">
      <SectionInformation
        :hint="$t('services.support_units.hint')"
        :title="$t('services.support_units.title')"
        mode="block"
      >
        <p>{{ $t('services.support_units.description') }}</p>
      </SectionInformation>
      <div>
        <!-- First row: 4 cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <div
            v-for="(item, i) in infoSupport.slice(0,4)"
            :key="item.key"
            :class="['flex flex-col items-center gap-4 p-4  rounded-lg shadow-sm', (i % 2 === 0) ? 'bg-primary-700 text-white' : 'bg-[#f2f2f2] dark:bg-primary-900']"
          >
            <component :is="item.icon" :class="(i % 2 === 0) ? 'w-12 h-12 md:w-16 md:h-16 text-white' : 'w-12 h-12 md:w-16 md:h-16 text-primary-700 dark:text-white'" />
            <div class="text-sm font-medium lg:text-base text-center md:px-4" :class="(i % 2 === 0) ? 'text-white' : 'text-gray-800 dark:text-white'">{{ item.title }}</div>
          </div>
        </div>

        <!-- Second row: 5 cards -->
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div
              v-for="(item, i) in infoSupport.slice(4,9)"
              :key="item.key"
              :class="['flex flex-col items-center gap-4 p-4 rounded-lg shadow-sm', ((i + 4) % 2 === 0) ? 'bg-primary-700 text-white' : 'bg-[#f2f2f2] dark:bg-primary-900']"
            >
              <component :is="item.icon" class="w-12 h-12 md:w-16 md:h-16" :class="((i + 4) % 2 === 0) ? ' text-white' : ' text-primary-700 dark:text-white'" />
              <div class="text-sm font-medium lg:text-base text-center md:px-4" :class="((i + 4) % 2 === 0) ? ' text-white' : ' text-gray-800 dark:text-white'">{{ item.title }}</div>
            </div>
          </div>
        <!-- duplicate block removed -->
      </div>
    </div>
  </section>
</template>
