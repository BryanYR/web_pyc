<template>
  <nav aria-label="Breadcrumb" class="text-sm">
    <ol class="flex items-center flex-wrap gap-1 text-gray-600 dark:text-white/80">
      <li v-for="(item, idx) in items" :key="idx" class="flex items-center">
        <template v-if="item.to && idx < items.length - 1">
          <NuxtLink :to="item.to" class="hover:text-primary-700 dark:hover:text-white transition">
            {{ item.label }}
          </NuxtLink>
        </template>
        <template v-else>
          <span class="text-gray-800 dark:text-white font-medium">{{ item.label }}</span>
        </template>
        <span v-if="idx < items.length - 1" class="mx-2 text-gray-400">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; to?: string }>
}>()
</script>

 
