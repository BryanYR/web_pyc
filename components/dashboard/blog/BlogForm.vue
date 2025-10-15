<script setup lang="ts">
import { ref, watch } from 'vue'
import InputField from '@/components/form/InputField.vue'
import FileUploader from '@/components/form/FileUploader.vue'
import Base from '@/components/button/Base.vue'
import RichEditor from '@/components/dashboard/blog/RichEditor.client.vue'
import Select from '@/components/form/Select.vue'
import type { BlogFormData } from '@/interfaces/blog'

interface Props {
  heading?: string
  submitText?: string
  initial?: Partial<BlogFormData>
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
    }
  ): void
  (e: 'cancel'): void
}>()

const title = ref(props.initial.title ?? '')
const shortDescription = ref(props.initial.shortDescription ?? '')
const isPublished = ref<'0' | '1'>(props.initial.isPublished ?? '0')
const content = ref(props.initial.content ?? '')
const fileBlog = ref<File | null>(null)
const imageUrl = ref<File | null>(null)

watch(
  () => props.initial,
  (val) => {
    title.value = val.title ?? ''
    shortDescription.value = val.shortDescription ?? ''
    isPublished.value = (val.isPublished as '0' | '1') ?? '0'
    content.value = val.content ?? ''
    fileBlog.value = null
    imageUrl.value = null
  }
)

function onSubmit() {
  emit('submit', {
    title: title.value,
    shortDescription: shortDescription.value,
    isPublished: isPublished.value,
    content: content.value,
    ...(fileBlog.value ? { fileBlog: fileBlog.value } : {}),
    ...(imageUrl.value ? { imageUrl: imageUrl.value } : {}),
  })
}

function onCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-semibold">{{ heading }}</h2>
    </div>
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
        <FileUploader
          v-model="fileBlog"
          label="Archivo (opcional)"
          id="fileBlog"
          accept=".pdf"
        />
      </div>
      <div class="md:col-span-6 col-span-12">
        <FileUploader
          v-model="imageUrl"
          label="Banner Principal"
          id="fileBlog"
          accept="image/*"
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
</template>
