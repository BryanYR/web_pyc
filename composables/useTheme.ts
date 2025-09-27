import { ref } from 'vue'

export const useTheme = () => {
  const getInitialTheme = (): 'light' | 'dark' => {
    try {
      const t = localStorage.getItem('theme')
      if (t === 'dark') return 'dark'
      if (t === 'light') return 'light'
    } catch(e) {}
    // fallback: prefers-color-scheme
    return (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
  }
  const theme = ref<'light'|'dark'>(getInitialTheme())

  function applyTheme(t: 'light'|'dark') {
    if (typeof document === 'undefined') return
    if (t === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try { localStorage.setItem('theme', t) } catch(e) {}
    theme.value = t
  }

  function toggle() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  // ensure DOM sync if called client-side
  if (typeof window !== 'undefined') applyTheme(theme.value)

  return { theme, toggle, applyTheme }
}