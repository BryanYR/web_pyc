<script setup lang="ts">
import { computed } from 'vue'
import type { SectionInformationProps } from "@/interfaces/ui";
import SectionTitle from "./SectionTitle.vue";

const props = withDefaults(defineProps<SectionInformationProps>(), {
  title: "",
  description: "",
  hint: "",
  type: "default",
  mode: "inline",
  classTitle: '',
  classHint: '',
  classDescription: ''
})


const inlineDescriptionClass = computed(() => {
  const base = 'text-base text-black dark:text-white max-w-[600px]'
  // `classDescription` is a prop exposed by defineProps/withDefaults
  return `${base} ${props.classDescription || ''}`.trim()
})

const defaultDescriptionClass = computed(() => {
  const base = 'text-base text-black dark:text-white mt-4'
  return `${base} ${props.classDescription || ''}`.trim()
})
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
      <SectionTitle :title="title" :hint="hint" :type="type" :class-hint="classHint" :class-title="classTitle" />
    </div>

    <!-- Descripción -->
    <div
      v-if="mode === 'inline'"
      class="row-start-2 md:col-span-2 md:!col-start-2 flex items-start justify-start"
    >
      <div :class="inlineDescriptionClass">
        <slot>
            {{ description }}
        </slot>
      </div>
    </div>

    <!-- Default mode -->
    <template v-else>
      <SectionTitle :title="title" :hint="hint" :type="type" :class-hint="classHint" :class-title="classTitle" />
      <div :class="defaultDescriptionClass">
        <slot>
            {{ description }}
        </slot>
      </div>
    </template>
  </div>
</template>
