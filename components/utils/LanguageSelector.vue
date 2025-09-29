<script setup lang="ts">
import { useNuxtApp } from '#app'

type Language = 'es' | 'en'
const selectorLanguage = ref<Language>('es')
const nuxtApp = useNuxtApp()

async function setLocale(l: Language) {
  // Esto asegura que Nuxt cargue el archivo JSON correspondiente
  await nuxtApp.$i18n.setLocale(l)
  console.log("Locale cambiado a:", l)
}
</script>

<template>
  <select v-model="selectorLanguage" @change="setLocale(selectorLanguage)">
    <option value="es">Español</option>
    <option value="en">English</option>
  </select>
</template>
