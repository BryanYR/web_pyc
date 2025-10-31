<script setup lang="ts">
import type { BlogListItem } from '@/interfaces/blog'
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

// Build a safe PDF URL when fileBlog is present
const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL as
  | string
  | undefined
const pdfUrl = computed(() => {
  const f = props.post.fileBlog
  const base = API_BASE
  if (!f || !base) return ''
  const cleanBase = base.replace(/\/$/, '')
  const cleanFile = String(f).replace(/^\/+/, '')
  return `${cleanBase}/${cleanFile}`
})
const pdfFileName = computed(() =>
  props.post.fileBlog
    ? String(props.post.fileBlog).split('/').pop() || 'archivo.pdf'
    : undefined
)

// Reverted: always link to blog detail page
</script>
<template>
  <article
    class="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-primary-700 shadow-sm ring-1 ring-black/5 group h-auto"
  >
    <NuxtLink :to="`/blog/${post.postId}`" class="block">
      <img
        v-if="isValidUrlFormat(post.imageUrl)"
        :src="post.imageUrl as string"
        :alt="post.title"
        class="h-44 w-full object-cover group-hover:brightness-95 transition"
      />
      <div
        v-else
        class="h-44 w-full bg-primary-700 flex items-center justify-center"
      >
        <img
          src="/images/logos/pyc_logo.svg"
          alt="PYC"
          class="h-10 opacity-90"
        />
      </div>
    </NuxtLink>
    <div class="p-5 flex flex-col gap-4 h-full justify-between">
      <div class="flex flex-col gap-2">
        <NuxtLink :to="`/blog/${post.postId}`" class="block">
          <h3 class="text-primary-700 dark:text-white font-semibold text-lg line-clamp-2">
            {{ displayTitle }}
          </h3>
        </NuxtLink>
        <p class="text-sm text-gray-600 dark:text-white line-clamp-2">
          {{ displayShortDescription }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink
          :to="`/blog/${post.postId}`"
          class="inline-block rounded-full border border-primary-700/30 dark:border-white px-4 py-1.5 text-sm text-primary-700 dark:text-white hover:bg-primary-100 dark:hover:bg-primary-600 transition"
        >
          Leer Nota
        </NuxtLink>
        <a
          v-if="pdfUrl"
          :href="pdfUrl"
          target="_blank"
          rel="noopener"
          :download="pdfFileName"
          class="inline-block rounded-full border border-primary-700/30 dark:border-white px-4 py-1.5 text-sm text-primary-700 dark:text-white hover:bg-primary-100 dark:hover:bg-primary-600 transition"
          @click.stop
        >
          Descargar PDF
        </a>
      </div>
    </div>
  </article>
</template>
