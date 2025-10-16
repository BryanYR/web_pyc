import pycPrivateApi from '@/api/config/pycPrivateApi'
import { safeRequest } from '@/utils/handleResponse'
import type { ApiResult } from '@/interfaces/response'
import type { ApiEnvelope, BlogCreatePayload, BlogUpdatePayload, BlogEntity, BlogListParams, BlogListData } from '@/interfaces/blog'

function toFormData(payload: BlogCreatePayload | BlogUpdatePayload) {
  const fd = new FormData()
  if (payload.title !== undefined) fd.append('title', payload.title)
  if (payload.shortDescription !== undefined)
    fd.append('shortDescription', payload.shortDescription)
  if (payload.content !== undefined) fd.append('content', payload.content)
  if (payload.isPublished !== undefined) fd.append('isPublished', payload.isPublished)
  if (payload.fileBlog) {
    fd.append('fileBlog', payload.fileBlog)
  }
  if ((payload as any).imageUrl) {
    fd.append('imageUrl', (payload as any).imageUrl)
  }
  return fd
}

function isAdminContext(explicit?: boolean): boolean {
  if (typeof explicit === 'boolean') return explicit
  if (typeof globalThis !== 'undefined' && globalThis.window) {
    try {
      return globalThis.window.location.pathname.startsWith('/dashboard')
    } catch {
      return false
    }
  }
  return false
}

function basePath(explicit?: boolean): string {
  return isAdminContext(explicit) ? '/adminblogs' : '/blogs'
}

export async function createBlog(payload: BlogCreatePayload, isAdmin?: boolean): Promise<ApiResult<BlogEntity>> {
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.post<ApiEnvelope<BlogEntity>>(`${basePath(isAdmin)}/save`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return { status, data: data.data }
  })
}

export async function updateBlog(id: number | string, payload: BlogUpdatePayload, isAdmin?: boolean): Promise<ApiResult<BlogEntity>> {
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.post<ApiEnvelope<BlogEntity>>(`${basePath(isAdmin)}/update/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return { status, data: data.data }
  })
}

export async function listPosts(params: BlogListParams, isAdmin?: boolean): Promise<ApiResult<BlogListData>> {
  const query = new URLSearchParams()
  if (params.filter != null) query.set('filter', String(params.filter))
  if (params.page != null) query.set('page', String(params.page))
  if (params.perPage != null) query.set('per_page', String(params.perPage))
  if (params.published != null && isAdmin) query.set('published', String(params.published))
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.get<ApiEnvelope<any>>(`${basePath(isAdmin)}?${query.toString()}`)
    // Normalize backend pagination shape to BlogListData
    const payload = data.data
    const normalized: BlogListData = Array.isArray(payload)
      ? { data: payload }
      : {
          data: payload.data ?? [],
          page: payload.current_page,
          perPage: payload.per_page,
          total: payload.total,
          lastPage: payload.last_page
        }
    return { status, data: normalized }
  })
}

export async function getPostsBlog(params: BlogListParams): Promise<ApiResult<BlogListData>> {
  const query = new URLSearchParams()
  if (params.filter != null) query.set('filter', String(params.filter))
  if (params.page != null) query.set('page', String(params.page))
  if (params.perPage != null) query.set('per_page', String(params.perPage))
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.get<ApiEnvelope<any>>(`/blogs?${query.toString()}`)
    // Normalize backend pagination shape to BlogListData
    const payload = data.data
    const normalized: BlogListData = Array.isArray(payload)
      ? { data: payload }
      : {
          data: payload.data ?? [],
          page: payload.current_page,
          perPage: payload.per_page,
          total: payload.total,
          lastPage: payload.last_page
        }
    return { status, data: normalized }
  })
}

export async function getPost(id: number | string, isAdmin?: boolean): Promise<ApiResult<BlogEntity>> {
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.get<ApiEnvelope<BlogEntity>>(`${basePath(isAdmin)}/${id}`)
    return { status, data: data.data }
  })
}
