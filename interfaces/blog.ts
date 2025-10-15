export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
  errors: any[]
}

export interface BlogEntity {
  postId: number
  title: string
  shortDescription: string
  content: string // HTML string
  fileBlog: string | null
  imageUrl: string | null
  authorId: number | string
  isPublished: '0' | '1'
  datePublished?: string
  created_at: string
  updated_at: string
  created_by?: number | string
  updated_by?: number | string
}

export interface BlogCreatePayload {
  title: string
  shortDescription: string
  content: string // HTML string
  isPublished: '0' | '1'
  fileBlog?: File | null
  imageUrl: File | null
}

export type BlogUpdatePayload = {
  title?: string
  shortDescription?: string
  content?: string // HTML string
  isPublished?: '0' | '1'
  fileBlog?: File | null
  imageUrl?: File | null
}

export interface BlogListParams {
  filter?: number | string
  page?: number
  perPage?: number
  published?: string // optional: e.g., 'all' | '1' | '0'
}

export interface BlogListItem {
  postId: number
  title: string
  shortDescription: string
  imageUrl: string | null
  isPublished: '0' | '1'
  created_at: string
  updated_at: string
}

export interface BlogListData {
  data: BlogListItem[]
  page?: number
  perPage?: number
  total?: number
  lastPage?: number
}

export interface BlogFormData {
  title: string
  shortDescription: string
  isPublished: '0' | '1'
  content: string
  fileBlog: File | null
  imageUrl: File | null
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
}
