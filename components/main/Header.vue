<script setup lang="ts">
import { ref } from "vue";
import LogoWhite from "@/assets/icons/LogoWhite.vue";
import { scrolling, navigationTo } from "@/composables/index";
import ButtonBase from "../button/Base.vue";
import { useRoute } from "vue-router";

const LanguageSelector = defineAsyncComponent(() => import('@/components/utils/LanguageSelector.vue'))
const route = useRoute();
const { isScrolled } = scrolling.useScroll(50);
const { navigateToSection } = navigationTo.useNavigation();

const isMenuOpen = ref(false);
const { t } = useI18n();

// Items de navegación
const navLinks = [
  { key: "home", id: "", path: "https://pyc.pe/", external: true },
  { key: "about", id: "aboutUs", path: "https://pyc.pe/nosotros", external: true },
  { key: "team", id: "team", path: "https://pyc.pe/equipo", external: true },
  { key: "services", id: "services", path: "https://pyc.pe/servicios", external: true },
  { key: "blog", id: "blog", path: "/blog" },
  { key: "contact", id: "contact", path: "" }
];

function handleNavigation(link: typeof navLinks[0]) {
  if (link.external) {
    window.location.href = link.path
  } else {
    navigateToSection(link.id, link.path)
  }
}


const hasPrimaryBg = computed(() => {
  return route.meta.headerBg === "primary";
});

const hasWhiteBg = computed(() => {
  return route.meta.headerBg === "white";
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 py-5 transition-colors duration-300 ease-in-out z-[100] text-white"
    :class="[hasPrimaryBg ? 'bg-primary-700' : (isScrolled ? 'bg-primary-700 ' : 'bg-transparent'), hasWhiteBg ? 'bg-white !text-primary-700 dark:bg-primary-900 dark:!text-white' : '']"
  >
    <div class="pyc-container mx-auto px-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <a href="https://pyc.pe/" aria-label="logo_pyc" target="_self">
          <LogoWhite class="h-12" />
        </a>
        <LanguageSelector :classes="`${hasWhiteBg ? 'border-primary-700 text-primary-700' : ''}`" />
      </div>

      <!-- NAV DESKTOP -->
      <nav class="hidden md:block">
        <ul class="flex gap-4 md:gap-8 items-center  text-sm lg:text-lg">
          <li v-for="link in navLinks" :key="link.key">
            <button
              class="hover:opacity-75 transition-opacity duration-300 ease-in-out"
              :class="[link.key === 'contact' ? 'font-semibold' : 'font-normal']"
              @click="handleNavigation(link)"
            >
              {{ t(`header.${link.key}`) }}
            </button>
          </li>
        </ul>
      </nav>

      <!-- HAMBURGER MOBILE -->
      <button
        @click="isMenuOpen = true"
        class="md:hidden focus:outline-none"
        aria-label="button_open_menu_mobile"
        :class="[hasWhiteBg ? 'text-primary-700 dark:text-white' : 'text-white']"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>

    <!-- OVERLAY MENU MOBILE -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-white dark:bg-primary-700 e z-[200] flex flex-col items-center justify-center"
      >
        <button
          @click="isMenuOpen = false"
          class="absolute top-5 right-5 text-gray-800 dark:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <ul class="flex flex-col md:gap-6 text-lg text-gray-900 dark:text-white text-center w-full">
          <li
            v-for="link in navLinks"
            :key="link.key"
            class="w-[80%] rounded-xl mx-auto h-full hover:bg-primary-600 transition hover:text-white"
          >
            <button
              @click="isMenuOpen = false; handleNavigation(link)"
              class="py-2 h-full block w-full"
            >
              {{ t(`header.${link.key}`) }}
            </button>
          </li>
        </ul>

        <div class="mt-8">
          <ButtonBase>{{ t("header.contact") }}</ButtonBase>
        </div>
      </div>
    </transition>
  </header>
</template>
