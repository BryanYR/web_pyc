<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// use the global scope to ensure we change the app-wide locale (especially with lazy loading)
const { locale } = useI18n({ useScope: 'global' })

function setLocale(l: 'es' | 'en') {
  locale.value = l // updates global locale and triggers lazy load
}
</script>

<template>
  <div class="flex gap-2 items-center">
    <button @click="setLocale('es')" :aria-pressed="locale==='es'">ES</button>
    <button @click="setLocale('en')" :aria-pressed="locale==='en'">EN</button>
  </div>
</template>
