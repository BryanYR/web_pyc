<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionInformation from "@/components/utils/SectionInformation.vue"
import SectionTitle from '@/components/utils/SectionTitle.vue'
import { divisionsIcon } from "@/constants/services"

const { t } = useI18n()

// map constants keys to the i18n object keys
const translationKeyMap: Record<string, string> = {
  lossprevention: 'loss_prevention',
  sinister: 'sinister',
  recoveries: 'recoveries_salvage',
  risk: 'risk_management',
}

// Build the array used in the template, preserving raw component references
const rawInfo = computed(() => {
  return divisionsIcon.map((item) => {
    const transKey = translationKeyMap[item.key] || item.key
    return {
      key: item.key,
      icon: markRaw(item.icon),
      title: t(`services.operational_divisions.${transKey}.title`),
      description: t(`services.operational_divisions.${transKey}.description`),
    }
  })
})

const infoDivisions = ref(rawInfo)
</script>

<template>
  <section id="divisions" class="bg-white dark:bg-primary-900 py-8 md:pt-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-6">
      <SectionInformation
        :hint="$t('services.operational_divisions.hint')"
        :title="$t('services.operational_divisions.title')"
        mode="block"
      >
      </SectionInformation>
      <div class="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in infoDivisions"
          :key="item.key"
          class="flex flex-col items-center text-center dark:bg-primary-900  rounded-2xl bg-[#f2f2f2] transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div
            class="flex flex-col gap-4 p-6 w-full justify-center items-start text-justify h-full"
          >
            <!-- icono -->
            <component
              :is="item.icon"
              class="w-12 h-12 md:w-16 md:h-16 text-primary-700 dark:text-white"
            />

            <!-- title-->
            <SectionTitle :title="item.title" class-title="!text-base" />
            
            <p class="text-gray-700 font-normal dark:text-white">
              {{ item.description }}
            </p>

            <!-- Boton de ver más información -->
            <button
              class="inline-flex items-center px-4 py-2 mt-auto border border-transparent text-sm font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 dark:bg-white dark:text-primary-700"
              type="button"
            >
              Mas información
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
