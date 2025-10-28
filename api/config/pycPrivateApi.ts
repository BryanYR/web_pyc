import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useCookie } from '#app'
const { VITE_API_BASE_URL } = import.meta.env;

export const pycPrivateApi = axios.create({
  baseURL: `${VITE_API_BASE_URL}/api`,
  headers: {
    Accept: 'application/json',
  },
})

pycPrivateApi.interceptors.request.use((config) => {
  try {
    const auth = useAuthStore()
    // prefer cookie to survive refresh; fallback to store
    const cookie = useCookie('pyc_token')
    const token = cookie.value || (auth as any).token || (auth as any).user?.token
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    console.error('ERROR IN AXIOS INTERCEPTOR', e)
  }
  return config
})

// Global response interceptor: on 401, logout and redirect to login
pycPrivateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      try {
        const auth = useAuthStore()
        // Clear auth state if store provides a logout
        if (auth && typeof (auth as any).logout === 'function') {
          ;(auth as any).logout()
        } else {
          // Fallback: clear common fields
          ;(auth as any).user = null
          ;(auth as any).token = null
        }
        // Clear auth cookie
        const cookie = useCookie('pyc_token')
        cookie.value = null as any
      } catch (e) {
        console.error('ERROR handling 401 in interceptor', e)
      }

      // Client-side redirect to login
      if (typeof globalThis !== 'undefined' && (globalThis as any).window) {
        (globalThis as any).window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default pycPrivateApi
