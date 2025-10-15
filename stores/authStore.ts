import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser } from '@/interfaces/auth'
import type { ApiResult } from '@/interfaces/response'
import { loginApi, registerApi, logoutApi } from '@/api/auth'
import { useCookie } from '#app'

interface LoginPayload {
  email: string
  password: string
}
interface RegisterPayload {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value?.token)
  const token = computed(() => user.value?.token)

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    const result: ApiResult<{ user: AuthUser; token: string }> = await loginApi(
      payload
    )
    if (result.ok) {
      user.value = { ...result.data.user, token: result.data.token }
      // persist token in cookie
      const cookie = useCookie('pyc_token', { maxAge: 60 * 60 * 24, sameSite: 'lax', path: '/' })
      cookie.value = result.data.token
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('pyc_user', JSON.stringify(user.value))
        } catch (e) {
          console.warn('No se pudo persistir pyc_user en localStorage', e)
        }
      }
    } else {
      error.value = result.message
      user.value = null
    }
    loading.value = false
    return result
  }

  async function register(payload: RegisterPayload) {
    loading.value = true
    error.value = null
    const result: ApiResult<{ user: AuthUser; token: string }> =
      await registerApi(payload)
    if (result.ok) {
      user.value = { ...result.data.user, token: result.data.token }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('pyc_user', JSON.stringify(user.value))
        } catch (e) {
          console.warn('No se pudo persistir pyc_user en localStorage', e)
        }
      }
    } else {
      error.value = result.message
      user.value = null
    }
    loading.value = false
    return result
  }

  async function logout() {
    try {
      loading.value = true
      error.value = null
      await logoutApi()
    } finally {
      const cookie = useCookie('pyc_token')
      cookie.value = null
      user.value = null
      error.value = null
      loading.value = false
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('pyc_user')
        } catch (e) {
          console.warn('No se pudo eliminar pyc_user de localStorage', e)
        }
      }
    }
  }

  function setUser(u: AuthUser | null) {
    user.value = u
    if (typeof window !== 'undefined') {
      try {
        if (u) localStorage.setItem('pyc_user', JSON.stringify(u))
        else localStorage.removeItem('pyc_user')
      } catch (e) {
        console.warn('No se pudo sincronizar pyc_user en localStorage', e)
      }
    }
  }

  function hydrate() {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('pyc_user')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.token) {
          user.value = parsed
        }
      }
    } catch (e) {
      console.warn('No se pudo hidratar pyc_user desde localStorage', e)
    }
  }

  // Auto-hidratar al instanciar el store si todavía no hay usuario
  if (typeof window !== 'undefined' && !user.value) {
    hydrate()
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    token,
    login,
    register,
    logout,
    setUser,
    hydrate,
  }
})
