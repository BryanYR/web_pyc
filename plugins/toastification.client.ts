import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Only load toast in dashboard or when needed
  const route = useRoute()
  
  if (route.path.startsWith('/dashboard') || route.path.startsWith('/login')) {
    import('vue-toastification').then(({ default: Toast }) => {
      import('vue-toastification/dist/index.css')
      nuxtApp.vueApp.use(Toast, {
        position: 'top-right',
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        showCloseButtonOnHover: false,
      })
    })
  }
})