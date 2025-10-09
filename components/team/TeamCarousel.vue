<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import SectionInformation from '@/components/utils/SectionInformation.vue'
import Email from '@/assets/icons/Email.vue'
import Phone from '@/assets/icons/Phone.vue'
import Arrow from '@/assets/icons/Arrow.vue'
import type { PersonInfo } from '@/interfaces/general'
import { ref, watch, nextTick, onMounted, onBeforeUnmount, type ComponentPublicInstance } from 'vue'
const { locale } = useI18n();

interface Props {
  items: PersonInfo[] | null | undefined
  hintKey: string
  titleKey: string
  descriptionKey?: string
  sliceStart?: number
  sliceEnd?: number
  autoplayDelay?: number
  showSkeleton?: boolean
  skeletonCount?: number
  showSeeAllButton?: boolean
  seeAllTo?: string
  seeAll?: string
}

const props = withDefaults(defineProps<Props>(), {
  sliceStart: 0,
  sliceEnd: undefined,
  autoplayDelay: 3000,
  showSkeleton: false,
  skeletonCount: 4,
  showSeeAllButton: false,
  seeAllTo: '/equipo',
  seeAll: 'home.team.button',
})

const modules = [Pagination, Navigation, Autoplay]

const slicedItems = computed(() => {
  if (!props.items) return []
  return props.items.slice(props.sliceStart, props.sliceEnd)
})

// Equal height logic -------------------------------------------------------
const cardEls = ref<HTMLElement[]>([])
const maxCardHeight = ref<number | null>(null)
let resizeRaf: number | null = null

function setCardEl(index: number) {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el instanceof HTMLElement) {
      cardEls.value[index] = el
    }
  }
}

// --- Height computation helpers (split to reduce complexity) -------------
function shouldSkipHeightComputation() {
  return props.showSkeleton && !slicedItems.value.length
}

function resetCardHeights() {
  cardEls.value.forEach(el => { if (el) el.style.height = 'auto' })
}

function findMaxCardHeight(): number {
  let max = 0
  for (const el of cardEls.value) {
    if (!el) continue
    const h = el.offsetHeight
    if (h > max) max = h
  }
  return max
}

function applyUniformHeight(height: number) {
  if (!height) return
  cardEls.value.forEach(el => { if (el) el.style.height = height + 'px' })
}

function computeHeights() {
  if (shouldSkipHeightComputation()) return
  resetCardHeights()
  const max = findMaxCardHeight()
  maxCardHeight.value = max || null
  applyUniformHeight(max)
}

function scheduleCompute() {
  if (resizeRaf) cancelAnimationFrame(resizeRaf)
  resizeRaf = requestAnimationFrame(() => computeHeights())
}

watch(slicedItems, async () => {
  // Clear previous refs (indices may change)
  cardEls.value = []
  await nextTick()
  scheduleCompute()
})

onMounted(() => {
  scheduleCompute()
  window.addEventListener('resize', scheduleCompute, { passive: true })
})

onBeforeUnmount(() => {
  if (resizeRaf) cancelAnimationFrame(resizeRaf)
  window.removeEventListener('resize', scheduleCompute)
})
</script>

<template>
  <section class="py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-10">
      <SectionInformation
        :hint="$t(props.hintKey)"
        :title="$t(props.titleKey)"
      >
        <p v-if="props.descriptionKey">{{ $t(props.descriptionKey) }}</p>
      </SectionInformation>

      <div class="relative pt-8">
        <!-- Botones de navegación -->
        <div class="absolute -top-6 right-0 flex gap-3 z-20">
          <button
            class="custom-button-prev w-10 h-10 rounded-full bg-primary-700 dark:bg-primary-500 text-white flex items-center justify-center shadow hover:bg-primary-500 transition"
          >
            <Arrow left />
          </button>
          <button
            class="custom-button-next w-10 h-10 rounded-full bg-primary-700  dark:bg-primary-500 text-white flex items-center justify-center shadow hover:bg-primary-500 transition"
          >
            <Arrow right />
          </button>
        </div>
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="20"
          :breakpoints="{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }"
          :autoplay="{ delay: props.autoplayDelay, pauseOnMouseEnter: true }"
          loop
          :pagination="{ clickable: true }"
          :navigation="{ nextEl: '.custom-button-next', prevEl: '.custom-button-prev' }"
          class="!pb-12 items-stretch"
        >
          <!-- Skeletons -->
          <SwiperSlide
            v-if="props.showSkeleton && !slicedItems.length"
            v-for="n in props.skeletonCount"
            :key="'skeleton-' + n"
            class="h-full flex"
          >
            <div class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full w-full animate-pulse">
              <div class="w-full h-72 md:h-64 bg-gray-200" />
              <div class="p-4 flex-grow flex flex-col items-center justify-center gap-2">
                <div class="h-5 w-32 bg-gray-200 rounded" />
                <div class="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </SwiperSlide>

          <!-- Items -->
          <SwiperSlide
            v-for="(member, i) in slicedItems"
            :key="i"
            class="h-full flex"
          >
            <div
              :ref="setCardEl(i)"
              class="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-xl flex flex-col h-full w-full"
            >
              <img :src="member.photo" :alt="member.name" class="w-full h-72 md:h-64 object-cover" loading="lazy" @load="scheduleCompute" />
              <div class="p-4 text-center flex-grow flex flex-col">
                <h3 class="text-lg font-semibold text-gray-900">{{ member.name }}</h3>
                <p class="text-sm text-gray-500">{{ member.position }}</p>
              </div>
              <div class="absolute inset-0 bg-white p-6 flex flex-col justify-center text-center items-center opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <h3 class="text-xl font-semibold text-primary-700">{{ member.name }}</h3>
                <p class="text-xs text-gray-700 text-justify line-clamp-8 my-2">{{ member.description }}</p>
                <div class="flex gap-2 text-xs items-center w-full my-2 justify-center">
                  <Email class="h-4 w-4 text-primary-700" />
                  <a :href="`mailto:${member.email}`" class="text-gray-900">{{ member.email }}</a>
                </div>
                <div class="flex gap-2 text-xs items-center w-full justify-center">
                  <Phone class="h-4 w-4 text-primary-700" />
                  <a :href="`tel:${member.phone}`" class="text-gray-900">{{ member.phone }}</a>
                </div>
                <a
                  v-if="member.linkedin"
                  :href="member.linkedin"
                  target="_blank"
                  class="mt-4 inline-block bg-primary-700 text-white text-sm font-medium rounded-2xl px-4 py-2"
                >
                  {{ locale === 'es' ? 'Ver LinkedIn' : 'View LinkedIn' }}
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div v-if="props.showSeeAllButton" class="pb-4 flex justify-center">
        <ButtonBase :to="props.seeAllTo"> {{ $t(props.seeAll) }} </ButtonBase>
      </div>
    </div>
  </section>
</template>
