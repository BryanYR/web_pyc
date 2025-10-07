export interface ApiMeta {
  requestId?: string
  [key: string]: any
}

export interface ApiSuccess<T> {
  ok: true
  status: number
  data: T
  meta?: ApiMeta
}

export interface ApiError {
  ok: false
  status: number
  message: string
  code?: string | number
  meta?: ApiMeta
  original?: unknown
}

export type ApiResult<T> = ApiSuccess<T> | ApiError
