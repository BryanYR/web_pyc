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
    fd.append('imageURL', (payload as any).imageUrl)
  }
  return fd
}

export async function createBlog(payload: BlogCreatePayload): Promise<ApiResult<BlogEntity>> {
  console.log('payload createBlog', payload)
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.post<ApiEnvelope<BlogEntity>>('/blogs/save', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return { status, data: data.data }
  })
}

export async function updateBlog(id: number | string, payload: BlogUpdatePayload): Promise<ApiResult<BlogEntity>> {
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.post<ApiEnvelope<BlogEntity>>(`/blogs/update/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return { status, data: data.data }
  })
}

export async function listPosts(params: BlogListParams): Promise<ApiResult<BlogListData>> {
  const query = new URLSearchParams()
  if (params.filter != null) query.set('filter', String(params.filter))
  if (params.page != null) query.set('page', String(params.page))
  if (params.perPage != null) query.set('per_page', String(params.perPage))
  if (params.published != null) query.set('published', String(params.published))
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

export async function getPost(id: number | string): Promise<ApiResult<BlogEntity>> {
  return safeRequest(async () => {
    const { data, status } = await pycPrivateApi.get<ApiEnvelope<BlogEntity>>(`/blogs/${id}`)
    return { status, data: data.data }
  })
}
