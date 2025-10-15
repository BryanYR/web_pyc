<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: File | null
  label?: string
  id?: string
  accept?: string // Coma separada: ej. "image/*,.pdf"
  placeholder?: string
  showFormatsHint?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*,.pdf', // imágenes y PDF por defecto
  placeholder: 'Arrastra un archivo o haz clic para seleccionar',
  showFormatsHint: true,
})
const emit = defineEmits<(e: 'update:modelValue', v: File | null) => void>()

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref('')
const previewUrl = ref<string | null>(null)

const formatsHint = computed(() => {
  const raw = props.accept?.split(',') || []
  const mapped = raw
    .map((r) => {
      const v = r.trim().toLowerCase()
      if (!v) return ''
      if (v === 'image/*') return 'JPG, PNG, WEBP'
      if (v === '.pdf' || v.endsWith('pdf')) return 'PDF'
      if (v.startsWith('.')) return v.slice(1).toUpperCase()
      return v
    })
    .filter(Boolean)
  return mapped.join(', ')
})

watch(
  () => props.modelValue,
  (f) => {
    if (!f) {
      fileName.value = ''
      previewUrl.value = null
      return
    }
    fileName.value = f.name
    if (f.type.startsWith('image/')) {
      const url = URL.createObjectURL(f)
      previewUrl.value = url
    } else {
      previewUrl.value = null
    }
  }
)

function onPick() {
  fileInput.value?.click()
}

function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files && input.files[0] ? input.files[0] : null
  emit('update:modelValue', f)
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  const f =
    e.dataTransfer?.files && e.dataTransfer.files[0]
      ? e.dataTransfer.files[0]
      : null
  emit('update:modelValue', f ?? null)
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium mb-1">{{
      label
    }}</label>
    <div
      class="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:border-secondary-700 transition"
      @click="onPick"
      @drop="onDrop"
      @dragover="onDragOver"
    >
      <div class="flex flex-col items-center gap-2">
        <div v-if="previewUrl" class="w-full">
          <img
            :src="previewUrl"
            alt="preview"
            class="mx-auto max-h-40 object-contain rounded"
          />
        </div>
        <div class="text-sm text-gray-600 space-y-1" v-else>
          <div>{{ placeholder }}</div>
          <div v-if="showFormatsHint" class="text-xs text-gray-500">
            Formatos permitidos: {{ formatsHint }}
          </div>
        </div>
        <div v-if="fileName" class="text-xs text-gray-500 truncate max-w-full">
          {{ fileName }}
        </div>
        <button
          type="button"
          class="inline-flex items-center px-3 py-1.5 text-sm rounded bg-secondary-700 text-white"
        >
          Seleccionar archivo
        </button>
      </div>
      <input
        :id="id"
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="accept"
        @change="onChange"
      />
    </div>
  </div>
</template>
