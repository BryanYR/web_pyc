import { ref } from 'vue'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string // ISO string
  category: string
}

export interface BlogPostDetail extends BlogPost {
  content: string
  author: {
    name: string
    avatar: string
  }
  readTime: number // minutes
  tags: string[]
}

export function useBlogPosts() {
  // full dataset (simulate DB)
  const all = ref<BlogPost[]>([
    {
      id: '1',
      title: 'Nuestros casos',
      excerpt:
        'Pensamos distinto y lo hacemos diferente Pensamos distinto y lo hacemos diferente Pensamos distinto y lo diferente',
      image: '/images/home/pyc_home_1.webp',
      date: new Date().toISOString(),
      category: 'all',
    },
    {
      id: '2',
      title: 'Nuestros casos',
      excerpt:
        'Pensamos distinto y lo hacemos diferente Pensamos distinto y lo hacemos diferente Pensamos distinto y lo diferente',
      image: '/images/home/pyc_home_2.webp',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      category: 'all',
    },
    {
      id: '3',
      title: 'Nuestros casos',
      excerpt:
        'Pensamos distinto y lo hacemos diferente Pensamos distinto y lo hacemos diferente Pensamos distinto y lo diferente',
      image: '/images/home/pyc_home_3.webp',
      date: new Date(Date.now() - 10 * 86400000).toISOString(),
      category: 'all',
    },
    {
      id: '4',
      title: 'Nuestros casos',
      excerpt:
        'Pensamos distinto y lo hacemos diferente Pensamos distinto y lo hacemos diferente Pensamos distinto y lo diferente',
      image: '/images/divisions/division1.webp',
      date: new Date(Date.now() - 20 * 86400000).toISOString(),
      category: 'all',
    },
    {
      id: '5',
      title: 'Nuestros casos',
      excerpt:
        'Pensamos distinto y lo hacemos diferente Pensamos distinto y lo hacemos diferente Pensamos distinto y lo diferente',
      image: '/images/divisions/division2.webp',
      date: new Date(Date.now() - 5 * 86400000).toISOString(),
      category: 'all',
    },
    {
      id: '6',
      title: 'Nuestros casos',
      excerpt:
        'Pensamos distinto y lo hacemos diferente Pensamos distinto y lo hacemos diferente Pensamos distinto y lo diferente',
      image: '/images/divisions/division3.webp',
      date: new Date(Date.now() - 27 * 86400000).toISOString(),
      category: 'all',
    },
  ])

  // create more items to see pagination
  for (let i = 7; i <= 24; i++) {
    all.value.push({
      id: String(i),
      title: `Nuestros casos ${i}`,
      excerpt:
        'Pensamos distinto y lo hacemos diferente Pensamos distinto y lo hacemos diferente Pensamos distinto y lo diferente',
      image: `/images/divisions/division${((i - 1) % 5) + 1}.webp`,
      date: new Date(Date.now() - (i % 30) * 86400000).toISOString(),
      category: 'all',
    })
  }

  type FetchParams = {
    tab?: 'all' | 'week' | 'month'
    page?: number
    perPage?: number
    search?: string
  }

  async function fetchPosts(params: FetchParams = {}) {
    const { tab = 'all', page = 1, perPage = 9, search = '' } = params

    // simulate network latency
    await new Promise((r) => setTimeout(r, 400))

    const now = new Date()
    const filtered = all.value.filter((p) => {
      // tab filter by date range
      if (tab !== 'all') {
        const d = new Date(p.date)
        const diffDays = (now.getTime() - d.getTime()) / 86400000
        if (tab === 'week' && diffDays > 7) return false
        if (tab === 'month' && diffDays > 31) return false
      }
      // search in title
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })

    const total = filtered.length
    const start = (page - 1) * perPage
    const end = start + perPage
    const items = filtered.slice(start, end)

    return { items, total, page, perPage }
  }

  async function fetchPostById(id: string): Promise<BlogPostDetail | null> {
    // simulate network latency
    await new Promise((r) => setTimeout(r, 350))

    const base = all.value.find((p) => p.id === id)
    if (!base) return null

    // Simple mock content based on the post title
    const paragraphs = [
      `Más a menudo de lo que crees, el desarrollo de producto comienza con un diseñador UX haciendo un wireframe o un redactor UX trabajando en el texto.`,
      `El primer paso determina lo que sucede después: si haces wireframes primero, el UX writer los utilizará, y si escribes primero, el diseñador creará wireframes basados en el texto.`,
      `No importa el enfoque, el objetivo es colaborar para descubrir las mejores soluciones y entregar un producto digital claro y útil.`,
    ]

    const detail: BlogPostDetail = {
      ...base,
      content: paragraphs.join('\n\n'),
      author: {
        name: 'Equipo PYC',
        avatar: '/images/logos/pyc_logo.svg',
      },
      readTime: 4 + (Number(base.id) % 6),
      tags: ['Design', 'UX', 'Strategy'].slice(0, (Number(base.id) % 3) + 1),
    }

    return detail
  }

  return { fetchPosts, fetchPostById }
}
