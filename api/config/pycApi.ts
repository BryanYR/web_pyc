import axios from 'axios'

// Variables de entorno (Nuxt 3 usa import.meta.env para Vite)
const { VITE_API_BASE_URL } = import.meta.env;

export const pycApi = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default pycApi