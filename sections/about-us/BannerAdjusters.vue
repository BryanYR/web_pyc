<script lang="ts" setup></script>
<template>
  <section id="certification" class="bg-white dark:bg-primary-900">
    <div class="w-full grid grid-cols-1 md:grid-cols-2">
      <div class="flex justify-center items-center py-16 md:py-0">
        <!-- versión light -->
        <img
          class="w-auto max-w-xs block dark:hidden"
          src="/images/about_us/logo-white.webp"
          alt="R&G"
        />
        <!-- versión dark -->
        <img
          class="w-auto max-w-xs hidden dark:block"
          src="/images/about_us/logowhite.webp"
          alt="R&G"
        />
      </div>
      <!-- Contenedor del mapa, pegado a la derecha -->
      <div class="flex justify-end">
        <img
          class="w-auto max-w-full"
          src="/images/about_us/MAPA.webp"
          alt="R&G"
        />
      </div>
    </div>
  </section>
</template>
