import type { ApiError, ApiResult, ApiSuccess } from '@/interfaces/response'
import axios, { AxiosError } from 'axios'

export function success<T>(status: number, data: T, meta?: any): ApiSuccess<T> {
  return { ok: true, status, data, meta }
}

export function failure(status: number, message: string, meta?: any, original?: unknown, code?: string | number): ApiError {
  return { ok: false, status, message, meta, original, code }
}

export function mapAxiosError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const axErr: AxiosError<any> = err
    const status = axErr.response?.status || 0
    const message = axErr.response?.data?.message || axErr.message || 'Unknown error'
    const code = (axErr as any).code
    return failure(status, message, { headers: axErr.response?.headers }, axErr, code)
  }
  return failure(0, 'Unexpected error', undefined, err)
}

export async function safeRequest<T>(fn: () => Promise<{ status: number; data: T }>): Promise<ApiResult<T>> {
  try {
    const res = await fn()
    return success<T>(res.status, res.data)
  } catch (e) {
    return mapAxiosError(e)
  }
}
