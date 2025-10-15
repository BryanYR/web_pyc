// Domain user stored in the app
export interface AuthUser {
  id: number | string
  email: string
  name: string
  roles?: string[]
  token?: string
}

// Raw user coming from API envelope
export interface ApiAuthUser {
  id: number
  name: string
  email: string
  created_at?: string
  updated_at?: string
}

// Generic auth API envelope
export interface ApiAuthEnvelope<T> {
  success: boolean
  message: string
  data: T
  errors: any[]
}

// Login/Register payloads
export interface LoginDto { email: string; password: string }
export interface RegisterDto { name: string; email: string; password: string }

// Envelope data shapes
export interface AuthLoginData { user: ApiAuthUser; token: string }
export type AuthRegisterData = AuthLoginData

// Logout response has data: null
// Logout response envelope will have data: null
