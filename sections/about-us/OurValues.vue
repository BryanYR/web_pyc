<script setup lang="ts">
import SectionTitle from '@/components/utils/SectionTitle.vue'
import { valuesIcons } from '@/constants/about-us'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const valuesOrder = [
  'person',
  'respect',
  'integrity',
  'solidarity',
  'loyalty',
  'collaboration',
  'gratitude',
  'innovation',
  'excellence',
  'passion',
]

/**
 * Retorna la clase de color según patrón ajedrez
 * - fila 0 → azul en impares
 * - fila 1 → azul en pares
 */
function getCellClass(index: number) {
  const realIndex = index + 1 // porque el título ocupa la posición 0
  const bluePositions = [2, 4, 5, 7, 10, 12]

  const isBlue = bluePositions.includes(realIndex + 1) // +1 porque queremos que "person" sea el 2°

  return isBlue ? 'bg-primary-700 text-white' : 'bg-[#f2f2f2] text-gray-900'
}
</script>

<template>
  <section
    id="aboutUs"
    class="bg-white dark:bg-primary-900 py-8 md:py-16 px-10"
  >
    <div class="pyc-container-section mx-auto">
      <div class="grid sm:grid-cols-2 md:grid-cols-4">
        <!-- bloque de título -->
        <div
          class="bg-[#f2f2f2] dark:[#f2f2f2] dark:text-gray-900 p-4 lg:p-8 flex items-center transition-transform duration-300 ease-in-out md:hover:scale-105 hover:shadow-xl"
        >
          <SectionTitle
            :hint="t('aboutUs.our_values.hint')"
            :title="t('aboutUs.our_values.title')"
            class-title="!text-4xl dark:text-primary-700 !border-secondary-700"
            class-hint="dark:text-primary-700"
          />
        </div>

        <!-- valores -->
        <template v-for="(key, index) in valuesOrder" :key="key">
          <div
            class="p-6 flex flex-col transition-transform duration-300 ease-in-out md:hover:scale-105 hover:shadow-xl"
            :class="getCellClass(index)"
          >
            <component
              :is="valuesIcons.find((v) => v.key === key)?.icon"
              class="w-10 h-10 mb-4"
            />
            <span class="font-semibold mb-2 text-2xl">
              {{ t(`aboutUs.our_values.${key}.title`) }}:
            </span>
            <p class="text-sm">
              {{ t(`aboutUs.our_values.${key}.description`) }}
            </p>
          </div>
        </template>

        <!-- bloque message -->
        <div
          class="bg-primary-700 dark:bg-primary-700 text-white flex items-center justify-center p-6 text-center transition-transform duration-300 ease-in-out md:hover:scale-105 hover:shadow-xl"
        >
          <p class="font-semibold">
            {{ t('aboutUs.our_values.message') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
