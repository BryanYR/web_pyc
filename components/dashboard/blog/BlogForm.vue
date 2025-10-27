<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import InputField from '@/components/form/InputField.vue'
import FileUploader from '@/components/form/FileUploader.vue'
import Base from '@/components/button/Base.vue'
import RichEditor from '@/components/dashboard/blog/RichEditor.client.vue'
import Select from '@/components/form/Select.vue'
import PostHero from '@/sections/blog/PostHero.vue'
import PostContent from '@/components/blog/detail/PostContent.vue'
import type { BlogFormData } from '@/interfaces/blog'

interface Props {
  heading?: string
  submitText?: string
  // Allow fileBlog to be a server path string or null when editing
  initial?: Partial<BlogFormData & { fileBlog?: string | null }>
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  heading: 'Nuevo post',
  submitText: 'Guardar',
  initial: () => ({}),
  loading: false,
})

const emit = defineEmits<{
  (
    e: 'submit',
    payload: {
      title: string
      shortDescription: string
      isPublished: '0' | '1'
      content: string
      fileBlog?: File
      imageUrl?: string
      author?: string
    }
  ): void
  (e: 'cancel'): void
}>()

const title = ref(props.initial.title ?? '')
const shortDescription = ref(props.initial.shortDescription ?? '')
const isPublished = ref<'0' | '1'>(props.initial.isPublished ?? '0')
const content = ref(props.initial.content ?? '')
const fileBlog = ref<File | null>(null)
const imageUrl = ref<string>(props.initial.imageUrl ?? "")
const author = ref<string>(props.initial.author ?? "")

// Build absolute URL for existing server file if provided like "/blogs/123.pdf"
const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined
const existingFileUrl = computed(() => {
  const raw = (props.initial?.fileBlog as unknown as string | null | undefined) || null
  if (!raw || !API_BASE) return ''
  const base = API_BASE.replace(/\/$/, '')
  const clean = raw.replace(/^\/+/, '')
  return `${base}/${clean}`
})

// Preview state and helpers
const showPreview = ref(false)
const togglePreview = () => { showPreview.value = !showPreview.value }

function estimateReadTime(text: string) {
  const words = (text || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

const previewPost = computed(() => ({
  title: title.value || 'Sin título',
  shortDescription: shortDescription.value || '',
  imageUrl: imageUrl.value || null,
  created_at: new Date().toISOString(),
}))
const previewAuthor = computed(() => ({ name: author.value || 'PYC', avatar: '' }))
const previewBreadcrumbs = computed(() => ([{ label: 'Blog', to: '/blog' }, { label: title.value || 'Previsualización' }]))
const readTime = computed(() => estimateReadTime(content.value))
const previewKey = computed(() => `${title.value}::${author.value}::${imageUrl.value}::${content.value.length}`)

watch(
  () => props.initial,
  (val) => {
    title.value = val.title ?? ''
    shortDescription.value = val.shortDescription ?? ''
    isPublished.value = (val.isPublished as '0' | '1') ?? '0'
    content.value = val.content ?? ''
    fileBlog.value = null
    imageUrl.value = val.imageUrl ?? ""
    author.value = val.author ?? ""
  }
)

function onSubmit() {
  emit('submit', {
    title: title.value,
    shortDescription: shortDescription.value,
    isPublished: isPublished.value,
    content: content.value,
    author: author.value,
    ...(fileBlog.value ? { fileBlog: fileBlog.value } : {}),
    ...(imageUrl.value ? { imageUrl: imageUrl.value } : ""),
  })
}

function onCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-semibold text-black">{{ heading }}</h2>
      <Base
        :classes="'px-3 py-1.5'"
        type="button"
        variant="outline"
        @click="togglePreview"
      >
        <span v-if="showPreview">Ocultar previsualización</span>
        <span v-else>Previsualizar</span>
      </Base>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Form column -->
      <div :class="showPreview ? 'lg:col-span-6' : 'lg:col-span-12'">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div class="col-span-12">
        <InputField
          v-model="title"
          label="Título"
          id="title"
          type="text"
          placeholder="Título del post"
          required
        />
          </div>
          <div class="md:col-span-8 col-span-12">
        <InputField
          v-model="shortDescription"
          label="Descripción corta"
          id="shortDescription"
          type="text"
          placeholder="Resumen del post"
          required
        />
          </div>
          <div class="md:col-span-4 col-span-12">
        <Select
          id="isPublished"
          label="Publicado"
          v-model="isPublished"
          :options="[
            { label: 'Borrador', value: '0' },
            { label: 'Publicado', value: '1' }
          ]"
        />
          </div>
          <div class="md:col-span-6 col-span-12">
        <InputField
          v-model="imageUrl"
          label="Url imagen (Banner principal)"
          id="imageUrl"
          type="text"
          placeholder="Url de la imagen"
        />
          </div>
          <div class="md:col-span-6 col-span-12">
        <InputField
          v-model="author"
          label="Autor"
          id="author"
          type="text"
          placeholder="Nombre del autor"
        />
          </div>
          <div class="col-span-12">
        <label for="current-file" class="block text-sm font-medium mb-1">Archivo actual</label>
        <div v-if="existingFileUrl" class="text-sm">
          <a :href="existingFileUrl" target="_blank" rel="noopener" class="text-primary-700 underline">
            Ver archivo (se abrirá en una nueva pestaña)
          </a>
          <p class="text-xs text-gray-500 mt-1">Si adjuntas un nuevo archivo, se reemplazará el existente.</p>
        </div>
        <div v-else class="text-sm text-gray-500">No hay archivo adjunto.</div>
          </div>
          <div class="col-span-12">
        <FileUploader
          v-model="fileBlog"
          label="Archivo (opcional)"
          id="fileBlog"
          accept=".pdf"
          aria-describedby="current-file"
        />
          </div>
          
          <div class="md:col-span-12 col-span-12 space-y-2">
        <label class="block text-sm font-medium mb-1" for="blog-content"
          >Contenido</label
        >
        <div id="blog-content">
          <RichEditor v-model="content" />
        </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t flex items-center justify-end gap-2">
          <Base
        :classes="'px-4 py-2'"
        type="button"
        variant="outline"
        @click="onCancel"
        :disabled="loading"
        >Cancelar</Base
      >
          <Base
        :classes="'px-4 py-2'"
        type="button"
        :disabled="loading"
        @click="onSubmit"
      >
        <span v-if="loading">Guardando…</span>
        <span v-else>{{ submitText }}</span>
          </Base>
        </div>
      </div>

      <!-- Preview column (desktop) -->
      <div v-if="showPreview" class="hidden lg:block lg:col-span-6">
        <div class="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
          <PostHero
            :key="previewKey"
            :post="previewPost"
            :readTime="readTime"
            :fullContent="content"
            :author="previewAuthor"
            :breadcrumbs="previewBreadcrumbs"
            :show-buttons="false"
          />
          <div class="px-6 py-8">
            <PostContent :key="previewKey + ':content'" :content="content" />
          </div>
        </div>
      </div>
    </div>

    <!-- Preview modal (mobile) -->
    <div v-if="showPreview" class="fixed inset-0 z-50 bg-black/50 flex lg:hidden">
      <div class="bg-white w-full h-full overflow-y-auto">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-base font-semibold">Previsualización</h3>
          <button class="text-sm px-3 py-1 rounded border" @click="togglePreview">Cerrar</button>
        </div>
        <PostHero
          :key="previewKey + ':mobile'"
          :post="previewPost"
          :readTime="readTime"
          :fullContent="content"
          :author="previewAuthor"
          :breadcrumbs="previewBreadcrumbs"
        />
        <div class="px-4 pb-8">
          <PostContent :key="previewKey + ':mobile:content'" :content="content" />
        </div>
      </div>
    </div>
  </div>
</template>
