<script setup lang="ts">
import SectionInformation from '@/components/utils/SectionInformation.vue'
import { policyIcons } from '@/constants/about-us'
import { useI18n } from 'vue-i18n'
import ImageModal from '@/components/utils/ImageModal.vue'
import { ref } from 'vue'

const { t } = useI18n()

// Creamos un array con texto traducido + icono
const policies = computed(() =>
  policyIcons.map((item) => ({
    description: t(`aboutUs.certification.policies.${item.key}`),
    icon: item.icon,
  }))
)

const showQualityPolicy = ref(false)
const showIsoCert = ref(false)
</script>

<template>
  <section id="certification" class="bg-white dark:bg-primary-800 py-8 md:py-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-6">
      <SectionInformation
        :hint="$t('aboutUs.certification.hint')"
        :title="$t('aboutUs.certification.title')"
        mode="block"
      >
        <p>{{ $t('aboutUs.certification.description') }}</p>
      </SectionInformation>

      <div class="py-4 flex flex-col">
        <strong class="text-lg">{{ $t('aboutUs.certification.subtitle') }}</strong>
        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div
            v-for="(policy, index) in policies"
            :key="index"
            class="flex items-center gap-4 py-4 rounded-lg"
          >
            <component
              :is="policy.icon"
              class="w-12 h-12 md:w-16 md:h-16 text-primary-700 dark:text-white shrink-0"
            />
            <p class="text-base">{{ policy.description }}</p>
          </div>
        </div>
      </div>
      <!-- BOTONES -->
      <div class="mt-4 flex flex-wrap gap-3">
        <ButtonBase classes="hover:scale-105 transition-transform duration-300 ease-in-out" @click="showQualityPolicy = true">
          {{ $t('aboutUs.certification.buttons.see_policie') || 'Ver política de calidad' }}
        </ButtonBase>
        <ButtonBase classes="hover:scale-105 transition-transform duration-300 ease-in-out" variant="outline" @click="showIsoCert = true">
          {{ $t('aboutUs.certification.buttons.see_certification') || 'Ver certificado' }}
        </ButtonBase>
      </div>

      <ImageModal
        v-model="showQualityPolicy"
        src="/images/certification/politica_de_calidad.webp"
        :title="$t('aboutUs.certification.images.quality_policy') || 'Política de calidad'"
        alt="Política de calidad"
      />
      <ImageModal
        v-model="showIsoCert"
        src="/images/certification/certificado_iso.webp"
        :title="$t('aboutUs.certification.images.iso_certificate') || 'Certificado ISO'"
        alt="Certificado ISO"
      />
    </div>
  </section>
</template>
