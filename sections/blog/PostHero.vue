<script setup lang="ts">
import Play from '@/assets/icons/Play.vue'
import Pause from '@/assets/icons/Pause.vue'
import Share from '@/assets/icons/Share.vue'
import Link from '@/assets/icons/Link.vue'
import Facebook from '@/assets/icons/Facebook.vue'
import Twitter from '@/assets/icons/Twitter.vue'
import WhatsApp from '@/assets/icons/Whatsapp.vue'
import Linkedin from '@/assets/icons/Linkedin.vue'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import PostMetaBar from '@/components/blog/detail/PostMetaBar.vue'
import { isValidUrlFormat } from '@/utils/general'
import Breadcrumb from '@/components/utils/Breadcrumb.vue'
import type { BlogListItem } from '@/interfaces/blog'
import { useI18n } from 'vue-i18n'

const { post, readTime, author, breadcrumbs, fullContent } = withDefaults(
  defineProps<{
    post: Pick<
    BlogListItem,
    'title' | 'shortDescription' | 'imageUrl' | 'created_at'
  >
    readTime: number
    author: { name: string; avatar: string }
    breadcrumbs?: { label: string; to?: string }[]
    fullContent?: string
    showButtons?: boolean
  }>(),
  {
    readTime: 0,
    author: () => ({ name: "", avatar: "" }),
    fullContent: "",
    showButtons: true,
  }
)

const validImage = computed(() => isValidUrlFormat(post.imageUrl))

// i18n for TTS language selection
const { locale } = useI18n()

// Text-to-Speech
type TtsState = 'idle' | 'playing' | 'paused'
const ttsState = ref<TtsState>('idle')
let utterance: SpeechSynthesisUtterance | null = null
const canSpeak = computed(
  () =>
    typeof globalThis !== 'undefined' &&
    !!globalThis.window &&
    'speechSynthesis' in globalThis.window
)

function stripHtml(html: string | undefined | null): string {
  if (!html) return ''
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    return (doc.body?.textContent || '').trim()
  } catch {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
}

function handleSpeakToggle() {
  if (!canSpeak.value) return
  const synth = globalThis.window!.speechSynthesis
  // Toggle: playing -> pause; paused -> resume; idle -> start
  if (ttsState.value === 'playing') {
    synth.pause()
    ttsState.value = 'paused'
    return
  }
  if (ttsState.value === 'paused') {
    synth.resume()
    ttsState.value = 'playing'
    return
  }
  const lang = locale.value?.startsWith('es') ? 'es-ES' : 'en-US'
  const text = `${post.title}\n\n${stripHtml(fullContent)}`.trim()
  utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.onstart = () => {
    ttsState.value = 'playing'
  }
  utterance.onpause = () => {
    ttsState.value = 'paused'
  }
  utterance.onresume = () => {
    ttsState.value = 'playing'
  }
  utterance.onend = () => {
    ttsState.value = 'idle'
  }
  synth.cancel()
  ttsState.value = 'playing'
  synth.speak(utterance)
}

onBeforeUnmount(() => {
  if (canSpeak.value) {
    const synth = globalThis.window!.speechSynthesis
    synth.cancel()
    ttsState.value = 'idle'
  }
})

// Share menu
const shareOpen = ref(false)
const shareBtnRef = ref<HTMLElement | null>(null)
const shareMenuRef = ref<HTMLElement | null>(null)
const copied = ref(false)
const shareItemClass =
  'w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-primary-600/40'

const shareItems = [
  {
    key: 'facebook',
    label: 'Compartir en Facebook',
    icon: Facebook,
    handler: () => shareFacebook(),
  },
  {
    key: 'twitter',
    label: 'Compartir en Twitter',
    icon: Twitter,
    handler: () => shareTwitter(),
  },
  {
    key: 'whatsapp',
    label: 'Compartir en WhatsApp',
    icon: WhatsApp,
    handler: () => shareWhatsApp(),
  },
  {
    key: 'linkedin',
    label: 'Compartir en LinkedIn',
    icon: Linkedin,
    handler: () => shareLinkedIn(),
  },
]

function currentUrl(): string {
  try {
    return globalThis.window?.location?.href || ''
  } catch {
    return ''
  }
}

async function copyLink() {
  try {
    const url = currentUrl()
    await navigator.clipboard.writeText(url)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // fallback
  }
}

function openShare(url: string) {
  try {
    globalThis.window?.open(url, '_blank', 'noopener')
  } catch {
    // noop
  }
}

function shareFacebook() {
  const u = encodeURIComponent(currentUrl())
  openShare(`https://www.facebook.com/sharer/sharer.php?u=${u}`)
}
function shareTwitter() {
  const u = encodeURIComponent(currentUrl())
  const text = encodeURIComponent(post.title)
  openShare(`https://twitter.com/intent/tweet?url=${u}&text=${text}`)
}
function shareWhatsApp() {
  const u = encodeURIComponent(currentUrl())
  const text = encodeURIComponent(post.title)
  openShare(`https://wa.me/?text=${text}%20${u}`)
}
function shareLinkedIn() {
  const u = encodeURIComponent(currentUrl())
  openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`)
}

function onDocumentClick(e: MouseEvent) {
  if (!shareOpen.value) return
  const target = e.target as Node
  const insideMenu = !!shareMenuRef.value && shareMenuRef.value.contains(target)
  const onButton = !!shareBtnRef.value && shareBtnRef.value.contains(target)
  if (!insideMenu && !onButton) shareOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <section>
    <div class="container mx-auto px-6">
      <!-- Title and meta -->
      <div class="mx-auto max-w-3xl sm:max-w-4xl lg:max-w-5xl 2xl:max-w-6xl">
        <div class="py-6 sm:pt-8 sm:pb-0">
          <div v-if="breadcrumbs && breadcrumbs.length" class="mb-2 border-b border-slate-300 pb-4">
            <Breadcrumb :items="breadcrumbs" />
          </div>
          <h1
            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-700 dark:text-white"
          >
            {{ post.title }}
          </h1>
          <p
            v-if="post.shortDescription"
            class="mt-3 text-gray-600 dark:text-white/80"
          >
            {{ post.shortDescription }}
          </p>
          <div class="mt-4">
            <PostMetaBar
              :author="author"
              :dateISO="post.created_at"
              :readTime="readTime"
            />
          </div>
          <!-- Actions: Listen and Share -->
          <div v-if="showButtons" class="mt-4 flex items-center gap-3 relative">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-700 text-primary-700 hover:bg-primary-50 hover:bg-primary-700 hover:text-white transition-colors duration-300 ease-in-out dark:border-white dark:text-white dark:hover:bg-primary-600/40 disabled:opacity-60"
              :disabled="!canSpeak"
              @click="handleSpeakToggle"
            >
              <span v-if="ttsState !== 'playing'" class="flex gap-2 items-center">
                <Play class="h-6 w-6" />
                {{ ttsState === 'paused' ? 'Reanudar' : 'Escuchar artículo' }}
              </span>
              <span v-else class="flex gap-2 items-center">
                <Pause class="h-6 w-6" />
                Pausar
              </span>
            </button>
            <div class="relative">
              <button
                ref="shareBtnRef"
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white transition-colors duration-300 ease-in-out hover:bg-primary-50 dark:border-white dark:text-white dark:hover:bg-primary-600/40"
                @click="shareOpen = !shareOpen"
              >
                <Share class="h-6 w-6" />
                Compartir
              </button>
              <transition
                enter-active-class="transition-opacity duration-150"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="shareOpen"
                  ref="shareMenuRef"
                  class="absolute left-0 mt-2 w-56 rounded-md bg-white dark:bg-primary-700 shadow-lg ring-1 ring-black/5 py-1 z-10"
                >
                  <button
                    :class="shareItemClass"
                    @click="copyLink"
                  >
                    <Link class="h-4 w-4" />
                    {{ copied ? 'Enlace copiado' : 'Copiar enlace' }}
                  </button>
                  <button
                    v-for="item in shareItems"
                    :key="item.key"
                    :class="shareItemClass"
                    @click="item.handler()"
                  >
                    <component :is="item.icon" class="h-4 w-4" />
                    {{ item.label }}
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
