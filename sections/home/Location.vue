<script setup lang="ts">
import { contactInfo } from '@/constants/contact';
</script>

<template>
  <section class="py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto grid grid-cols-1 lg:grid-cols-3">
      <!-- Columna de Contactos -->
      <div
        class="flex flex-col sm:flex-row lg:flex-col gap-4 bg-white rounded-tl-2xl rounded-tr-2xl lg:rounded-tr-none lg:rounded-l-2xl px-2 py-6 w-full"
      >
        <div
          v-for="(item, i) in contactInfo"
          :key="i"
          class="flex items-center flex-col lg:flex-row w-full text-center lg:text-left"
        >
          <component :is="item.icon" class="text-primary-700 m-3 h-8 w-8" />
          <div
            class="flex flex-col gap-2 pt-4 lg:pt-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-primary-700"
          >
            <h4 class="text-base lg:text-xl font-bold text-gray-900">
              {{ item.title }}
            </h4>
            <template v-for="(text, j) in item.content" :key="j">
              <p
                v-if="!(item.strongIndex && item.strongIndex.includes(j))"
                class="text-sm font-normal text-gray-600"
              >
                {{ text }}
              </p>
              <strong v-else class="text-sm text-gray-600">
                {{ text }}
              </strong>
            </template>
          </div>
        </div>
      </div>

      <!-- Mapa -->
      <div class="md:col-span-2 w-full">
        <iframe
          title="Ubicación PYC"
          aria-label="Mapa de la sede principal de PYC en San Isidro, Lima"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.271335216167!2d-77.04236122141955!3d-12.09356791218803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c85c5cc42cb3%3A0x45c895b2fd2298e1!2sC.%20Los%20Sauces%20325%2C%20San%20Isidro%2015073%2C%20Per%C3%BA!5e0!3m2!1ses-419!2sus!4v1741960237139!5m2!1ses-419!2sus"
          width="100%"
          height="100%"
          style="min-height: 340px"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
</template>
