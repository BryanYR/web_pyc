import type { ApiResult } from '@/interfaces/response'
import type { AuthUser, ApiAuthEnvelope, LoginDto, RegisterDto, AuthLoginData } from '@/interfaces/auth'
import pycApi from '@/api/config/pycApi'
import pycPrivateApi from '@/api/config/pycPrivateApi'
import { safeRequest } from '@/utils/handleResponse'

function normalizeAuthResponse(raw: AuthLoginData): { user: AuthUser; token: string } {
  const { token } = raw
  const { id, email, name } = raw.user
  return { user: { id, email, name, token }, token }
}

export async function loginApi(payload: LoginDto): Promise<ApiResult<{ user: AuthUser; token: string }>> {
  return safeRequest(async () => {
    const { data: envelope, status } = await pycApi.post<ApiAuthEnvelope<AuthLoginData>>('/login', payload)
    const normalized = normalizeAuthResponse(envelope.data)
    return { status, data: normalized }
  })
}

export async function registerApi(payload: RegisterDto): Promise<ApiResult<{ user: AuthUser; token: string }>> {
  return safeRequest(async () => {
    const { data: envelope, status } = await pycApi.post<ApiAuthEnvelope<AuthLoginData>>('/register', payload)
    const normalized = normalizeAuthResponse(envelope.data)
    return { status, data: normalized }
  })
}

export async function logoutApi(): Promise<ApiResult<null>> {
  return safeRequest(async () => {
    const { data: envelope, status } = await pycPrivateApi.post<ApiAuthEnvelope<null>>('/logout')
    return { status, data: envelope.data }
  })
}
