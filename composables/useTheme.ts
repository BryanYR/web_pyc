import { ref } from 'vue'

export const useTheme = () => {
  const getInitialTheme = (): 'light' | 'dark' => {
    // Always start in light mode regardless of saved preference or OS setting
    return 'light'
  }
  const theme = ref<'light'|'dark'>(getInitialTheme())

  function applyTheme(t: 'light'|'dark') {
    if (typeof document === 'undefined') return
    if (t === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try {
      localStorage.setItem('theme', t)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('Failed to persist theme in localStorage:', e)
      }
    }
    theme.value = t
  }

  function toggle() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  // ensure DOM sync if called client-side
  if (typeof window !== 'undefined') applyTheme(theme.value)

  return { theme, toggle, applyTheme }
}