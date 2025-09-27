<script setup lang="ts">
import Sun from "@/assets/icons/Sun.vue";
import Moon from "@/assets/icons/Moon.vue";
import { useTheme } from "@/composables/useTheme";

const { theme, toggle } = useTheme();

// opcional: keyboard accessible handler si necesitas más control
</script>

<template>
  <button
    @click="toggle"
    :aria-pressed="theme === 'dark'"
    aria-label="Cambiar tema"
    class="fixed bottom-16 right-6 z-50 p-3 rounded-full shadow-lg bg-slate-800 dark:bg-primary-700  text-white dark:border dark:border-slate-800"
  >
    <client-only>
      <Moon v-if="theme !== 'dark'" class="h-6 w-6"/>
      <Sun v-else class="h-6 w-6" />
    </client-only>
  </button>
</template>
