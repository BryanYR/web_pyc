<script setup lang="ts">
import { useLocalizedJson } from '@/composables/useLocalizedJson'
import type { PersonInfo } from '@/interfaces/general'
import SectionInformation from '@/components/utils/SectionInformation.vue'
import Email from '@/assets/icons/Email.vue'
import Phone from '@/assets/icons/Phone.vue'
import Arrow from '@/assets/icons/Arrow.vue'
import { useI18n } from 'vue-i18n'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const modules = [Pagination, Navigation, Autoplay]

const { data: team, loading } = useLocalizedJson<PersonInfo[]>('team')
const { locale } = useI18n()
</script>

<template>
  <section id="team" class="py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-10">
      <SectionInformation
        :hint="$t('home.team.hint')"
        :title="$t('home.team.title')"
      >
        <p>{{ $t('home.team.description') }}</p>
      </SectionInformation>

      <div class="relative pt-8">
        <!-- Botones de navegación -->
        <div class="absolute -top-6 right-0 flex gap-3 z-20">
          <button
            class="custom-button-prev w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center shadow hover:bg-primary-500 transition"
          >
            <Arrow left />
          </button>
          <button
            class="custom-button-next w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center shadow hover:bg-primary-500 transition"
          >
            <Arrow right />
          </button>
        </div>
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="20"
          :breakpoints="{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }"
          :autoplay="{ delay: 3000 }"
          loop
          :pagination="{ clickable: true }"
          :navigation="{
            nextEl: '.custom-button-next',
            prevEl: '.custom-button-prev',
          }"
          class="!pb-12 items-stretch"
        >
          <!-- Si está cargando, mostramos skeletons -->
          <SwiperSlide
            v-if="loading"
            v-for="n in 4"
            :key="'skeleton-' + n"
            class="h-full flex"
          >
            <div
              class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full w-full animate-pulse"
            >
              <!-- Imagen skeleton -->
              <div class="w-full h-72 md:h-64 bg-gray-200"></div>

              <!-- Info básica skeleton -->
              <div
                class="p-4 flex-grow flex flex-col items-center justify-center gap-2"
              >
                <div class="h-5 w-32 bg-gray-200 rounded"></div>
                <div class="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </SwiperSlide>

          <!-- Si ya hay data -->
          <SwiperSlide
            v-else
            v-for="(member, i) in team"
            :key="i"
            class="h-full flex"
          >
            <div
              class="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-xl flex flex-col h-full w-full"
            >
              <!-- Imagen -->
              <img
                :src="member.photo"
                :alt="member.name"
                class="w-full h-72 md:h-64 object-cover"
                loading="lazy"
              />

              <!-- Info básica -->
              <div class="p-4 text-center flex-grow flex flex-col">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ member.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ member.position }}</p>
              </div>

              <!-- Overlay con info extra -->
              <div
                class="absolute inset-0 bg-white p-6 flex flex-col justify-center text-center items-center opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
              >
                <h3 class="text-xl font-semibold text-primary-700">
                  {{ member.name }}
                </h3>
                <p class="text-xs text-gray-700 text-justify line-clamp-6 my-2">
                  {{ member.description }}
                </p>
                <div
                  class="flex gap-2 text-xs items-center w-full my-2 justify-center"
                >
                  <Email class="h-4 w-4 text-primary-700" />
                  <a :href="`mailto:${member.email}`">
                    {{ member.email }}
                  </a>
                </div>
                <div
                  class="flex gap-2 text-xs items-center w-full justify-center"
                >
                  <Phone class="h-4 w-4 text-primary-700" />
                  <a :href="`tel:${member.phone}`">
                    {{ member.phone }}
                  </a>
                </div>
                <a
                  v-if="member.linkedin"
                  :href="member.linkedin"
                  target="_blank"
                  class="mt-4 inline-block bg-primary-700 text-white text-sm font-medium rounded-2xl px-4 py-2"
                >
                  {{ locale === 'es' ? 'Ver LinkedIn' : 'See LinkedIn' }}
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="pb-4 flex justify-center">
        <ButtonBase to="/equipo"> {{ $t('home.team.button') }} </ButtonBase>
      </div>
    </div>
  </section>
</template>
