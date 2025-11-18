<script setup lang="ts">
import { useNuxtApp } from '#app'
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    classes?: string
  }>(),
  {
    classes: 'border-white text-white',
  }
)

type Language = 'es' | 'en'
const nuxtApp = useNuxtApp()
const route = useRoute()

// Initialize selector from i18n locale (handle ref or string)
const rawLocale = nuxtApp.$i18n?.locale
const initialLocale =
  (rawLocale &&
    (typeof rawLocale === 'string' ? rawLocale : rawLocale.value)) ||
  'es'
const selectorLanguage = ref<Language>(initialLocale as Language)
const open = ref(false)
const isMounted = ref(false)

// Computed class that reacts to route changes (only after mount)
const buttonClasses = computed(() => {
  if (!isMounted.value) {
    return 'border-white text-white'
  }
  const _ = route.path
  const __ = selectorLanguage.value
  return props.classes
})

onMounted(() => {
  isMounted.value = true
})

async function setLocale(l: Language) {
  if (selectorLanguage.value === l) {
    open.value = false
    return
  }
  selectorLanguage.value = l
  await nuxtApp.$i18n.setLocale(l)
  open.value = false
}

function toggle() {
  open.value = !open.value
}

// Keep selector in sync if locale changes elsewhere
if (
  nuxtApp.$i18n &&
  nuxtApp.$i18n.locale &&
  typeof nuxtApp.$i18n.locale !== 'string'
) {
  watch(nuxtApp.$i18n.locale, (v: any) => {
    selectorLanguage.value = v
  })
}
</script>

<template>
  <div class="relative inline-block text-left">
    <button
      type="button"
      @click="toggle"
      :class="buttonClasses"
      class="flex items-center gap-2 px-3 py-1 rounded-full border  bg-transparent hover:bg-white/10 transition"
      aria-haspopup="true"
      :aria-expanded="open"
    >
      <span class="text-sm font-medium">{{
        selectorLanguage === 'es' ? 'ES' : 'EN'
      }}</span>
      <svg
        class="w-4 h-4"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <transition name="fade">
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-36 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div>
          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-100 transition hover:rounded-none"
            @click="setLocale('es')"
            role="menuitem"
          >
            Español
          </button>
        </div>
        <div>
          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-100 transition hover:rounded-none"
            @click="setLocale('en')"
            role="menuitem"
          >
            English
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
