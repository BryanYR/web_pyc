import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser } from '@/interfaces/auth';
import type { ApiResult } from '@/interfaces/response';
import { safeRequest } from '@/utils/handleResponse';

interface LoginPayload { email: string; password: string }

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value?.token)
  const token = computed(() => user.value?.token)

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    const result: ApiResult<{ user: AuthUser; token: string }> = await safeRequest(async () => {
      await new Promise(r => setTimeout(r, 300))
      return {
        status: 200,
        data: {
          user: { id: 'u1', email: payload.email, name: 'Demo User', roles: ['user'], token: 'demo-token' },
          token: 'demo-token'
        }
      }
    })
    if (result.ok) {
      user.value = { ...result.data.user, token: result.data.token }
    } else {
      error.value = result.message
      user.value = null
    }
    loading.value = false
    return result
  }

  function logout() {
    user.value = null
    error.value = null
  }

  function setUser(u: AuthUser | null) { user.value = u }

  return { user, loading, error, isAuthenticated, token, login, logout, setUser }
})
