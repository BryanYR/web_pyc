<script setup lang="ts">
import PostCard from '@/components/blog/PostCard.vue'
import PostTabs from '@/components/blog/PostTabs.vue'
import Pagination from '@/components/blog/Pagination.vue'
import { onMounted, ref, watch } from 'vue'
import { useBlogStore } from '@/stores/blogStore'

const store = useBlogStore()

const STORAGE_KEY = 'blog_grid_state'

// Try to restore state from sessionStorage
function restoreState() {
  if (globalThis.window === undefined) return null
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

// Save state to sessionStorage
function saveState() {
  if (globalThis.window === undefined) return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      activeTab: activeTab.value,
      page: page.value,
      perPage: perPage.value
    }))
  } catch {
    // ignore
  }
}

const savedState = restoreState()

const activeTab = ref<'all' | 'week' | 'month'>(savedState?.activeTab || 'all')
const page = ref(savedState?.page || 1)
const perPage = ref(savedState?.perPage || 6)

const tabs = [
  { label: 'Todas', value: 'all' },
  { label: 'Última semana', value: 'week' },
  { label: 'Del mes', value: 'month' },
]

function tabToFilter(tab: 'all' | 'week' | 'month'): number {
  // all=0, week=1, month=2
  let result: number
  if (tab === 'all') {
    result = 0
  } else if (tab === 'week') {
    result = 1
  } else {
    result = 2
  }
  return result
}

async function load() {
  await store.fetch(
    {
      filter: tabToFilter(activeTab.value),
      page: page.value,
      perPage: perPage.value,
      published: 1,
    }
  )
}

onMounted(load)
// When tab changes, reset page to 1 and reload
watch(activeTab, () => {
  page.value = 1
  load()
  saveState()
})
// When page or perPage changes, just reload
watch([page, perPage], () => {
  load()
  saveState()
})
</script>
<template>
  <section class="container mx-auto px-6 py-10">
    <div class="mx-auto max-w-6xl">
      <PostTabs v-model="activeTab" :tabs="tabs" class="mb-6" />

      <div
        v-if="store.loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60"
      >
        <div
          v-for="n in perPage"
          :key="n as number"
          class="h-64 rounded-md bg-gray-200 animate-pulse"
        ></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-16">
        <PostCard v-for="(post, index) in store.items" :key="post.postId" :post="post" :index="index" />
      </div>

      <Pagination
        class="mt-6"
        :page="page"
        :total="store.total || 0"
        :perPage="perPage"
        @update:page="(p: number)=> page = p"
      />
    </div>
  </section>
</template>
