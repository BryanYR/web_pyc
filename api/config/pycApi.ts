import axios from 'axios'
const { VITE_API_BASE_URL } = import.meta.env;

export const pycApi = axios.create({
  baseURL: `${VITE_API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default pycApi