import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useCookie } from '#app'
const { VITE_API_BASE_URL } = import.meta.env;

export const pycPrivateApi = axios.create({
  baseURL: `${VITE_API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
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

export default pycPrivateApi
