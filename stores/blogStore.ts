import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { BlogEntity, BlogListData, BlogListParams, BlogCreatePayload, BlogUpdatePayload } from '@/interfaces/blog'
import { listPosts, createBlog, updateBlog } from '@/api/blogs'
import type { ApiResult } from '@/interfaces/response'

export const useBlogStore = defineStore('blog', () => {
  const items = ref<BlogListData['data']>([])
  const page = ref<number>(1)
  const total = ref<number | undefined>(undefined)
  const perPage = ref<number | undefined>(undefined)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const route = useRoute()

  function detectAdmin(): boolean {
    if (typeof globalThis !== 'undefined' && globalThis.window) {
      return globalThis.window.location.pathname.startsWith('/dashboard')
    }
    // SSR-safe fallback using route
    try {
      return route.path.startsWith('/dashboard')
    } catch {
      return true
    }
  }

  async function fetch(params?: BlogListParams, isAdmin?: boolean) {
    loading.value = true
    error.value = null
    const baseParams: BlogListParams = { filter: 0, page: 1 }
    let merged: BlogListParams = { ...baseParams }
    if (params) {
      merged = { ...merged, ...params }
    }
    const effective: BlogListParams = {
      ...merged,
      perPage: merged.perPage ?? perPage.value,
    }
    console.log('effective', effective)
    const admin = typeof isAdmin === 'boolean' ? isAdmin : detectAdmin()
    const res = await listPosts(effective, admin)
    if (res.ok) {
      items.value = res.data.data
      page.value = res.data.page ?? merged.page ?? 1
      total.value = res.data.total
      perPage.value = res.data.perPage
    } else {
      error.value = res.message
      items.value = []
    }
    loading.value = false
    return res
  }

  async function create(payload: BlogCreatePayload, isAdmin?: boolean): Promise<ApiResult<BlogEntity>> {
    loading.value = true
    error.value = null
    const admin = typeof isAdmin === 'boolean' ? isAdmin : detectAdmin()
    const res = await createBlog(payload, admin)
    if (!res.ok) error.value = res.message
    loading.value = false
    return res
  }

  async function update(id: number | string, payload: BlogUpdatePayload, isAdmin?: boolean): Promise<ApiResult<BlogEntity>> {
    loading.value = true
    error.value = null
    const admin = typeof isAdmin === 'boolean' ? isAdmin : detectAdmin()
    const res = await updateBlog(id, payload, admin)
    if (!res.ok) error.value = res.message
    loading.value = false
    return res
  }

  return { items, page, total, perPage, loading, error, fetch, create, update }
})
