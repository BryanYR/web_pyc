<script setup lang="ts">
import SectionInformation from '@/components/utils/SectionInformation.vue'
import { policyIcons } from '@/constants/about-us'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Creamos un array con texto traducido + icono
const policies = computed(() =>
  policyIcons.map((item) => ({
    description: t(`aboutUs.certification.policies.${item.key}`),
    icon: item.icon,
  }))
)
</script>

<template>
  <section id="certification" class="bg-white dark:bg-primary-900 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-6">
      <SectionInformation
        :hint="$t('aboutUs.certification.hint')"
        :title="$t('aboutUs.certification.title')"
        mode="block"
      >
        <p>{{ $t('aboutUs.certification.description') }}</p>
      </SectionInformation>

      <div class="py-4 flex flex-col">
        <strong class="text-lg">{{ $t('aboutUs.certification.subtitle') }}</strong>
        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div
            v-for="(policy, index) in policies"
            :key="index"
            class="flex items-center gap-4 py-4 rounded-lg"
          >
            <component
              :is="policy.icon"
              class="w-12 h-12 md:w-16 md:h-16 text-primary-700 dark:text-white shrink-0"
            />
            <p class="text-base">{{ policy.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
