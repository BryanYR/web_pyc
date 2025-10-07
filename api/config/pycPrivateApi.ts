import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const baseURL =
  (import.meta as any).env?.VITE_API_PLATFORM ||
  process.env.VITE_API_PLATFORM ||
  'https://api.example.com'

export const pycPrivateApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

pycPrivateApi.interceptors.request.use((config) => {
  try {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${auth.token}`
    }
  } catch (e) {
    console.error('ERROR IN AXIOS INTERCEPTOR', e)
  }
  return config
})

export default pycPrivateApi