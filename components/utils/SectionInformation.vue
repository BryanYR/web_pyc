<script setup lang="ts">
import type { SectionInformationProps } from "@/interfaces/ui";
import SectionTitle from "./SectionTitle.vue";

withDefaults(defineProps<SectionInformationProps>(), {
  title: "",
  description: "",
  hint: "",
  type: "default",
  mode: "inline",
});
</script>

<template>
  <div
    class="w-full h-full"
    :class="
      mode === 'inline' ? 'flex flex-col gap-4 md:grid md:grid-cols-3' : 'flex flex-col gap-4'
    "
  >
    <!-- Título -->
    <div
      v-if="mode === 'inline'"
      class="row-start-1 md:col-start-1 flex items-start justify-start"
    >
      <SectionTitle :title="title" :hint="hint" :type="type" />
    </div>

    <!-- Descripción -->
    <div
      v-if="mode === 'inline'"
      class="row-start-2 md:col-span-2 md:!col-start-2 flex items-start justify-start"
    >
      <div class="text-base text-black dark:text-white max-w-[600px]">
        <slot>
            {{ description }}
        </slot>
      </div>
    </div>

    <!-- Default mode -->
    <template v-else>
      <SectionTitle :title="title" :hint="hint" :type="type" />
      <div v-if="description" class="text-base text-black">
        <slot>
            {{ description }}
        </slot>
      </div>
    </template>
  </div>
</template>
