<script setup lang="ts">
import type { BlogListItem } from '@/interfaces/blog';
import { isValidUrlFormat } from '@/utils/general'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const props = defineProps<{ post: BlogListItem }>()

const { locale } = useI18n()
const isSpanish = computed(() => locale.value?.startsWith('es'))

const displayTitle = computed(() => {
  // Prefer localized field when available, fallback to default title
  return isSpanish.value
    ? props.post.title
    : props.post.title_en ?? props.post.title
})

const displayShortDescription = computed(() => {
  // Prefer localized field when available, fallback to default shortDescription
  return isSpanish.value
    ? props.post.shortDescription
    : props.post.shortDescription_en ?? props.post.shortDescription
})

// Reverted: always link to blog detail page
</script>
<template>
  <NuxtLink
    :to="`/blog/${post.postId}`"
    class="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-primary-700 shadow-sm ring-1 ring-black/5 group"
  >
    <img
      v-if="isValidUrlFormat(post.imageUrl)"
      :src="post.imageUrl as string"
      :alt="post.title"
      class="h-44 w-full object-cover group-hover:brightness-95 transition"
    />
    <div v-else class="h-44 w-full bg-primary-700 flex items-center justify-center">
      <img src="/images/logos/pyc_logo.svg" alt="PYC" class="h-10 opacity-90" />
    </div>
    <div class="p-5">
      <h3 class="text-primary-700 dark:text-white font-semibold text-lg">
        {{ displayTitle }}
      </h3>
      <p class="mt-2 text-sm text-gray-600 dark:text-white line-clamp-4">
        {{ displayShortDescription }}
      </p>
      <div class="mt-4">
        <span
          class="inline-block rounded-full border border-primary-700/30 dark:border-white px-4 py-1.5 text-sm text-primary-700 dark:text-white group-hover:bg-primary-100 dark:group-hover:bg-primary-600 transition"
          >Leer Nota</span
        >
      </div>
    </div>
  </NuxtLink>
</template>
