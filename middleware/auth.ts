import { useAuthStore } from '@/stores/authStore'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  const tokenCookie = useCookie<string | null>('pyc_token')
  const isAuthed = auth.isAuthenticated || !!tokenCookie.value

  if (!isAuthed && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }
})