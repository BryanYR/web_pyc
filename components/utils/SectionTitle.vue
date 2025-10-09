<script lang="ts" setup>
import type { SectionTitleProps } from "@/interfaces/ui";

const props = withDefaults(defineProps<SectionTitleProps>(), {
  type: "default",
});

// función para separar las partes del título
const firstThree = computed(() => {
  if (!props.title) return "";
  return props.title.length < 3 ? props.title : props.title.slice(0, 3);
});
const rest = computed(() => {
  if (!props.title) return "";
  return props.title.length < 3 ? "" : props.title.slice(3);
});
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <div class="flex shrink-0 items-center gap-2">
      <slot name="start"></slot>

      <h4
        v-if="type === 'compact'"
        class="font-normal text-primary-700 dark:text-white"
      >
        <div v-if="props?.hint" class="text-base" :class="[classHint]">{{ hint }}</div>
        <div v-if="props?.title" class="text-xl font-bold">
          <span class="border-b-4 border-primary-500" :class="[classTitle]">{{ firstThree }}</span>
          <span>{{ rest }}</span>
        </div>
      </h4>

      <h4
        v-else
        class="flex shrink-0 flex-col font-normal gap-2 text-primary-700 dark:text-white"
      >
        <span v-if="props?.hint" class="relative top-2 text-xl md:text-2xl" :class="[classHint]">
          {{ hint }}
        </span>
        <span class="text-3xl lg:text-4xl xl:text-5xl font-bold" :class="[classTitle]">
          <span class="border-b-4 border-secondary-700 dark:border-white" :class="[classTitle]">{{
            firstThree
          }}</span>
          <span>{{ rest }}</span>
        </span>
      </h4>
    </div>
  </div>
</template>
