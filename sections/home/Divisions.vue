<script setup lang="ts">
import { useLocalizedJson } from '@/composables/useLocalizedJson'
import SectionInformation from "@/components/utils/SectionInformation.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, EffectCreative, Autoplay } from "swiper/modules";
import type { DivisionInfo } from "@/interfaces/general";
import Arrow from "@/assets/icons/Arrow.vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

const modules = [Pagination, Navigation, EffectCreative, Autoplay];

const { data: divisions } = useLocalizedJson<DivisionInfo[]>('operative-divisions')
</script>

<template>
  <section id="services" class="bg-white dark:bg-primary-900 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-10">
      <SectionInformation :title="$t('home.divisions.title')" />

      <div v-if="divisions && divisions.length" class="relative py-8">
        <!-- Botones custom -->
        <div class="absolute -top-6 right-0 flex gap-3 z-20">
          <button
            class="custom-div-button-prev w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center shadow hover:bg-primary-500 transition"
          >
            <Arrow left />
          </button>
          <button
            class="custom-div-button-next w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center shadow hover:bg-primary-500 transition"
          >
            <Arrow right />
          </button>
        </div>

        <!-- Swiper -->
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="24"
          :navigation="{
            nextEl: '.custom-div-button-next',
            prevEl: '.custom-div-button-prev',
          }"
          :autoplay="{ delay: 3000 }"
          loop
          effect="creative"
          :creative-effect="{
            prev: { translate: ['-100%', 0, 0], opacity: 0 },
            next: { translate: ['100%', 0, 0], opacity: 0 },
          }"
          class="rounded-2xl overflow-hidden"
        >
          <SwiperSlide
            v-for="(division, i) in divisions"
            :key="i"
            class="relative"
          >
            <!-- Imagen -->
            <img
              :src="division.imageUrl"
              :alt="division.title"
              class="w-full hidden sm:flex h-[450px] object-cover"
            />

            <!-- Card inferior derecha -->
            <div
              class="flex flex-col m-4 sm:absolute sm:bottom-8 sm:right-8 bg-white p-6 md:p-8 rounded-xl shadow-lg w-[90%] md:w-[60%] lg:w-[40%] text-left transition-all duration-500"
            >
              <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {{ division.title }}
              </h3>
              <p class="text-gray-600 mb-6">
                {{ division.description }}
              </p>
              <div>
                <NuxtLink
                  to="/servicios"
                  class="w-auto inline-block px-6 py-2 bg-primary-600 text-white font-medium rounded-lg shadow hover:bg-primary-700 transition-colors"
                >
                  {{ $t('home.divisions.button') }}
                </NuxtLink>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>
