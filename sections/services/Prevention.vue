<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionInformation from '@/components/utils/SectionInformation.vue'
import { preventionsIcon } from '@/constants/services'

const { t } = useI18n()

// map icon keys to the i18n subkeys under services.loss_prevention
const preventionKeyMap: Record<string, string> = {
  prevention_1: 'supervision',
  prevention_2: 'control_entry',
  prevention_3: 'control_inspection',
  prevention_4: 'control_exit',
  prevention_5: 'inspection',
}

const rawInfo = computed(() => {
  return preventionsIcon.map((item) => {
    const subKey = preventionKeyMap[item.key] || item.key
    return {
      key: item.key,
      icon: markRaw(item.icon),
      title: t(`services.loss_prevention.${subKey}.title`),
    }
  })
})

const infoPreventions = ref(rawInfo)
</script>

<template>
  <section id="prevention" class="py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto grid md:grid-cols-2 gap-6">
      <SectionInformation
        :hint="$t('services.loss_prevention.hint')"
        :title="$t('services.loss_prevention.title')"
        mode="block"
        class-description="!font-normal"
      >
        <p>{{ $t('services.loss_prevention.description') }}</p>
        <p>{{ $t('services.loss_prevention.p1') }}</p>
      </SectionInformation>
      <div class="grid lg:grid-cols-2 gap-4">
        <div
          v-for="(item, index) in infoPreventions"
          :key="item.key"
          class="flex flex-col items-center gap-4 p-4 border border-primary-700 rounded-lg shadow-sm bg-white dark:bg-primary-700"
          :class="index === (infoPreventions.length - 1) ? 'lg:col-span-2' : ''"
        >
          <component :is="item.icon" class="w-12 h-12 md:w-16 md:h-16 text-primary-700 dark:text-white" />
          <div class="text-sm lg:text-base font-medium text-gray-800 dark:text-white">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
