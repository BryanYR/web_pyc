<script setup lang="ts">
import BgBanner from "/images/home/bg_banner_desktop.webp";
import ButtonBase from "@/components/button/Base.vue";
import { useRouter } from "vue-router";

const router = useRouter()
</script>

<template>
  <div
    class="h-screen w-full flex items-center justify-start bg-cover bg-top relative"
    :style="{ backgroundImage: `url(${BgBanner})` }"
  >
  <div class="absolute top-0 left-0 right-0 bg-black/40 h-full w-full"></div>
    <div class="text-white px-4 py-10 pyc-container mx-auto z-10 gap-4 flex flex-col">
      <h1 class="uppercase text-4xl lg:text-6xl font-bold">{{ $t('home.banner.title') }}</h1>
      <h2 class="text-2xl lg:text-4xl font-normal">{{ $t('home.banner.subtitle') }}</h2>
      <div>
        <ButtonBase class="py-2 px-6"  to="/nosotros"> {{ $t('home.banner.button') }} </ButtonBase>
      </div>
    </div>
  </div>
</template>
