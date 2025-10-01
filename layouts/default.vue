<script setup lang="ts">
import Header from "@/components/main/Header.vue";
import Footer from "@/components/main/Footer.vue";
import Loader from "@/components/Loader.vue";
import ThemeToggle from "@/components/utils/ThemeToggle.vue";

const showLoader = ref(false);
onMounted(() => {
  showLoader.value = true;
  // Loader component self-hides after its duration; keep render for a bit to allow transition
  setTimeout(() => {
    showLoader.value = false;
  }, 3000);
});
</script>

<template>
  <div class="relative bg-[#f2f2f2] dark:bg-primary-900 text-black dark:text-white">
    <Header />
    <main class="w-full h-full">
      <slot />
    </main>
    <Footer />
    <Loader v-if="showLoader" />
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <ThemeToggle />
    </div>
  </div>
</template>
