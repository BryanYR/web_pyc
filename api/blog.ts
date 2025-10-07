import type { ApiResult } from '@/interfaces/response'
import type { BlogPost } from '@/interfaces/general'
import { safeRequest } from '@/utils/handleResponse'

// Simulación de un delay para representar una llamada real
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchBlogPosts(): Promise<ApiResult<BlogPost[]>> {
  return safeRequest(async () => {
    // Simulamos llamada externa
    await delay(300)
    // Realmente aquí sería: const res = await pycApi.get('/blog/posts')
    const mock: BlogPost[] = [
      { id: '1', title: 'Primer Post', body: 'Contenido simulado', publishedAt: new Date().toISOString() },
      { id: '2', title: 'Segundo Post', body: 'Más contenido simulado', publishedAt: new Date().toISOString() },
    ]
    return { status: 200, data: mock }
  })
}

export async function fetchBlogPost(id: string): Promise<ApiResult<BlogPost>> {
  return safeRequest(async () => {
    await delay(250)
    const mock: BlogPost = { id, title: `Post ${id}`, body: 'Detalle del post simulado', publishedAt: new Date().toISOString() }
    return { status: 200, data: mock }
  })
}
