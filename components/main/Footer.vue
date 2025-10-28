<script setup lang="ts">
import Facebook from "@/assets/icons/Facebook.vue";
import Instagram from "@/assets/icons/Instagram.vue";
import Linkedin from "@/assets/icons/Linkedin.vue";
import PycTexto from "/images/logos/logo_white_text.webp";
import { contactInfo } from "@/constants/contact";
</script>

<template>
  <footer id="contactUs" class="w-full h-full flex bg-primary-700 text-white">
    <div class="pyc-container mx-auto flex flex-col lg:flex-row items-center">
      <div class="h-full w-full lg:max-w-[350px]">
        <div
          class="flex flex-col justify-center items-center h-full gap-4 px-8 py-8 lg:py-0 text-center"
        >
          <img :src="PycTexto" alt="Logo PYC" class="w-60" />
          <p class="text-primary-700 text-sm md:text-base font-semibold">
            Ajustadores y Peritos de Seguros
          </p>
        </div>
      </div>
      <div class="w-full flex flex-col sm:flex-row gap-2 justify-between items-start p-8 lg:p-16">
        <div
          v-for="(item, i) in contactInfo"
          :key="i"
          class="flex items-center flex-col lg:flex-row w-full text-center lg:text-left"
        >
          <div
            class="flex flex-col gap-2 pt-4 lg:pt-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-primary-700"
          >
            <h4 class="text-base lg:text-xl font-bold">
               {{ $t(`home.info_contact.${item.keyOptional}`) }}
            </h4>
            <template v-for="(text, j) in item.content" :key="j">
              <p
                v-if="!(item.strongIndex && item.strongIndex.includes(j))"
                class="text-sm font-normal"
              >
                {{ text }}
              </p>
              <strong v-else class="text-sm">
                 {{ $t(`home.info_contact.${text}`) }} :
              </strong>
            </template>
            <template v-if="i == contactInfo.length - 1">
                <div class="w-full flex gap-2 mt-4">
                    <a class="rounded-full border border-white p-2 hover:bg-white hover:text-primary-700 transition duration-300 ease-in-out" target="_blank" href="https://www.facebook.com/PrevencionControlPe?mibextid=wwXIfr">
                        <Facebook class="h-4 w-4" />
                    </a>
                    <a class="rounded-full border border-white p-2 hover:bg-white hover:text-primary-700 transition duration-300 ease-in-out" target="_blank" href="https://www.instagram.com/pyc.peru/?igsh=ajRoNGg3YmtzcGgw#">
                        <Instagram class="h-4 w-4" />
                    </a>
                    <a class="rounded-full border border-white p-2 hover:bg-white hover:text-primary-700 transition duration-300 ease-in-out" target="_blank" href="https://www.linkedin.com/company/pyc-pe/">
                        <Linkedin class="h-4 w-4" />
                    </a>
                </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
