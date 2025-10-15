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
  <component
    :is="to ? 'NuxtLink' : 'button'"
    class=" px-6 py-2 rounded-2xl  duration-300 ease-in-out border-2 border-secondary-700"
    :class="[
      variant === 'solid'
        ? 'bg-secondary-700 hover:shadow-xl transition-shadow text-white'
        : ' text-secondary-700 bg-transparent',
      classes,
      {'border-slate-500 bg-slate-400 opacity-40 shadow-none': disabled}
    ]"
    :to="to || undefined"
    :type="type || 'button'"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>
