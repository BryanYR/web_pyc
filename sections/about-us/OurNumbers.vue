<script setup lang="ts">
import SectionInformation from '@/components/utils/SectionInformation.vue'
import { numbersIcons } from '@/constants/about-us'
import { useI18n } from 'vue-i18n'
import type { ComponentPublicInstance } from 'vue'

const { t } = useI18n()

function formatNumber(value: string | number) {
  return new Intl.NumberFormat('en-US').format(Number(value))
}

// imágenes asociadas a cada key
const numberImages: Record<string, string> = {
  inspections: '/images/divisions/division5.webp',
  sinister: '/images/divisions/division2.webp',
  imports: '/images/divisions/division3.webp',
  invesments: '/images/divisions/division4.webp',
}

// valores finales desde el JSON
const rawInfo = numbersIcons.map((item) => ({
  key: item.key,
  icon: markRaw(item.icon),
  image: numberImages[item.key],
  title: t(`aboutUs.our_number.${item.key}.title`),
  target: Number(t(`aboutUs.our_number.${item.key}.value`)),
}))

const infoNumbers = ref(
  rawInfo.map((i) => ({
    ...i,
    value: 0, // empieza en 0
  }))
)

// control de animación por elemento
const itemEls = ref<HTMLElement[]>([])
const hasAnimated = ref<boolean[]>(rawInfo.map(() => false))
let observer: IntersectionObserver | null = null

function setItemEl(index: number) {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el instanceof HTMLElement) itemEls.value[index] = el
  }
}

function animateValue(
  index: number,
  start: number,
  end: number,
  duration = 2000
) {
  const startTime = performance.now()

  function step(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1)
    infoNumbers.value[index].value = Math.floor(
      progress * (end - start) + start
    )
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  // Observa cada card y anima cuando entre al viewport
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = itemEls.value.indexOf(entry.target as HTMLElement)
          if (idx !== -1 && !hasAnimated.value[idx]) {
            hasAnimated.value[idx] = true
            animateValue(idx, 0, rawInfo[idx].target, 2000)
            observer?.unobserve(entry.target)
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  // comenzar a observar los elementos ya montados
  itemEls.value.forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section id="our_numbers" class="bg-white dark:bg-primary-900 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto gap-6">
      <SectionInformation
        :hint="$t('aboutUs.our_number.hint')"
        :title="$t('aboutUs.our_number.title')"
        mode="block"
      />

      <div class="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, i) in infoNumbers"
          :key="item.key"
          :ref="setItemEl(i)"
          class="flex flex-col items-center text-center bg-white dark:bg-primary-800  rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <!-- imagen -->
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full object-cover mb-4 rounded-t-2xl h-[12rem]"
          />

          <div
            class="flex flex-col gap-4 p-6 w-full justify-center items-center"
          >
            <!-- icono -->
            <component
              :is="item.icon"
              class="w-10 h-10 mb-3 text-primary-700 dark:text-white"
            />

            <!-- número con + -->
            <span class="text-3xl font-bold text-primary-700 dark:text-white mb-2">
              +{{ formatNumber(item.value) }}
            </span>

            <!-- título -->
            <p class="text-secondary-800 font-medium dark:text-white">
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
