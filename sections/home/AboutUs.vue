<script setup lang="ts">
import PycHomeOne from "/images/home/pyc_home_1.webp";
import PycHomeTwo from "/images/home/pyc_home_2.webp";
import PycHomeThree from "/images/home/pyc_home_3.webp";
import SectionInformation from "@/components/utils/SectionInformation.vue";
import ButtonBase from "@/components/button/Base.vue";

// Lista de imágenes para iterar
const aboutImages = [
  { src: PycHomeOne, alt: "Equipo gestionando casos" },
  { src: PycHomeTwo, alt: "Colaboradores en oficina" },
  { src: PycHomeThree, alt: "Proceso de evaluación de siniestros" },
];


// Clases comunes para todas las imágenes
const imgClasses = "w-full h-[15rem] object-cover lg:w-80 lg:h-60 rounded-tr-2xl rounded-bl-2xl";
</script>

<template>
  <section id="aboutUs" class="bg-white dark:bg-primary-900 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-10">
      <!-- Información -->
      <SectionInformation
        :hint="$t('home.about.hint')"
        :title="$t('home.about.title')"
      >
        <p>{{ $t("home.about.description.p1") }}</p>
        <p class="mt-4">{{ $t("home.about.description.p2") }}</p>
      </SectionInformation>

      <!-- Imágenes -->
      <div class="grid md:grid-cols-3 gap-4">
        <figure
          v-for="(img, i) in aboutImages"
          :key="i"
          class="flex justify-center "
        >
          <img
            :src="img.src"
            :alt="img.alt"
            :class="imgClasses"
            loading="lazy"
          />
        </figure>
      </div>

      <!-- Botón -->
      <div class="pb-4 flex justify-center">
        <ButtonBase to="/nosotros"> {{ $t("home.about.button") }} </ButtonBase>
      </div>
    </div>
  </section>
</template>
