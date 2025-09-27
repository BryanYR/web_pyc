<script lang="ts" setup>
  interface Props {
    right?: boolean;
    left?: boolean;
    top?: boolean;
    bottom?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {});

  const rotationClass = computed(() => {
    return {
      "-rotate-90": props.right,
      "rotate-90": props.left,
      "rotate-180": props.top,
    };
  });
</script>

<template>
  <svg
    :class="rotationClass"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00002 10.6334C7.91113 10.6334 7.8278 10.6195 7.75002 10.5918C7.67224 10.564 7.60002 10.5168 7.53335 10.4501L4.45002 7.36675C4.3278 7.24453 4.26946 7.09175 4.27502 6.90842C4.28058 6.72509 4.34446 6.57231 4.46669 6.45009C4.58891 6.32786 4.74446 6.26675 4.93335 6.26675C5.12224 6.26675 5.2778 6.32786 5.40002 6.45009L8.00002 9.05009L10.6167 6.43342C10.7389 6.3112 10.8917 6.25286 11.075 6.25842C11.2584 6.26397 11.4111 6.32786 11.5334 6.45009C11.6556 6.57231 11.7167 6.72786 11.7167 6.91675C11.7167 7.10564 11.6556 7.2612 11.5334 7.38342L8.46669 10.4501C8.40002 10.5168 8.3278 10.564 8.25002 10.5918C8.17224 10.6195 8.08891 10.6334 8.00002 10.6334Z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped>
  .rotate-0 {
    transform: rotate(0deg);
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
