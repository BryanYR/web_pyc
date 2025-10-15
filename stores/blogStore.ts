import { defineStore } from 'pinia'
import { ref } from 'vue'
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

  async function fetch(params: BlogListParams = { filter: 0, page: 1 }) {
    loading.value = true
    error.value = null
    const effective: BlogListParams = {
      ...params,
      perPage: params.perPage ?? perPage.value,
    }
    const res = await listPosts(effective)
    if (res.ok) {
      items.value = res.data.data
      page.value = res.data.page ?? params.page ?? 1
      total.value = res.data.total
      perPage.value = res.data.perPage
    } else {
      error.value = res.message
      items.value = []
    }
    loading.value = false
    return res
  }

  async function create(payload: BlogCreatePayload): Promise<ApiResult<BlogEntity>> {
    loading.value = true
    error.value = null
    const res = await createBlog(payload)
    if (!res.ok) error.value = res.message
    loading.value = false
    return res
  }

  async function update(id: number | string, payload: BlogUpdatePayload): Promise<ApiResult<BlogEntity>> {
    loading.value = true
    error.value = null
    const res = await updateBlog(id, payload)
    if (!res.ok) error.value = res.message
    loading.value = false
    return res
  }

  return { items, page, total, perPage, loading, error, fetch, create, update }
})
