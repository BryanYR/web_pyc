export interface AuthUser {
  id: string
  email: string
  name: string
  roles: string[]
  token?: string
}
