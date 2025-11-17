export default defineNuxtPlugin(() => {
  // Load non-critical CSS asynchronously after page load
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback for better performance
    const loadStyles = () => {
      // Only load editor styles in dashboard
      if (window.location.pathname.includes('/dashboard')) {
        const editorStyle = document.createElement('link')
        editorStyle.rel = 'stylesheet'
        editorStyle.href = '/_nuxt/@wangeditor/editor/dist/css/style.css'
        document.head.appendChild(editorStyle)
      }
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadStyles)
    } else {
      setTimeout(loadStyles, 1)
    }
  }
})
