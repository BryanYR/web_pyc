<script setup lang="ts">
import SectionInformation from "@/components/utils/SectionInformation.vue";
import MapInspectors from "@/components/utils/MapInspectors.vue";
import Map from "@/components/utils/Map.vue";
import type { InspectorList } from "@/interfaces/general";

const records = ref<InspectorList[]>([]);

onMounted(async () => {
  const res = await fetch("/json/inspectors.json");
  records.value = await res.json();
});
</script>

<template>
  <section class="py-8 md:pb-16 px-10">
    <div class="pyc-container-section mx-auto flex flex-col gap-10">
      <SectionInformation :hint="$t('team.inspectors.hint')" :title="$t('team.inspectors.title')">
      </SectionInformation>
      <div class="relative grid md:grid-cols-2">
        <div class="col-span-1 hidden w-full sm:flex justify-center items-center">
            <Map class="max-w-[300px] lg:max-w-[400px] lg:h-[650px]" />
        </div>
        <div class="p-4">
          <div class="p-4 rounded-2xl bg-primary-700 max-w-[300px] mx-auto text-white">
            <div
              v-for="(item, index) in records"
              :key="index"
              class="flex justify-between text-sm md:text-base"
            >
              <span class="font-medium">{{ item.specialty }}</span>
              <span class=" font-bold">{{ item.qty }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
