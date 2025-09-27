<script setup lang="ts">
import type { ButtonBaseProps } from '@/interfaces/ui';
withDefaults(
  defineProps<ButtonBaseProps>(),
  {
    variant: "solid",
  }
);
</script>
<template>
  <NuxtLink
    class=" px-6 py-1 rounded-2xl  duration-300 ease-in-out"
    :class="[
      variant === 'solid'
        ? 'bg-secondary-700 hover:shadow-xl transition-shadow text-white'
        : 'border-2 border-secondary-700 text-secondary-700 bg-transparent',
      classes,
    ]"
    @click="$emit('click')"
    :to="to ?? '/'"
  >
    <slot />
  </NuxtLink>
</template>
