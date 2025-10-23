<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// No importes el CSS arriba si usas SSR, hazlo dentro del onMounted
let QuillEditorComp: any = null

interface Props { modelValue: string }
const props = defineProps<Props>()
const emit = defineEmits<(e: 'update:modelValue', v: string) => void>()
const content = ref(props.modelValue)

watch(() => props.modelValue, (v) => { if (v !== content.value) content.value = v })
watch(content, (v) => emit('update:modelValue', v))

const ready = ref(false)

onMounted(async () => {
  if (typeof window !== 'undefined') {
    await import('@vueup/vue-quill/dist/vue-quill.snow.css')
    const mod = await import('@vueup/vue-quill')
    QuillEditorComp = mod.QuillEditor
    ready.value = true
  }
})
</script>

<template>
  <ClientOnly>
    <component
      v-if="ready && QuillEditorComp"
      :is="QuillEditorComp"
      v-model:content="content"
      contentType="html"
      theme="snow"
      class="bg-white "
      toolbar="full"
    />
  </ClientOnly>
</template>
<style>
.ql-editor{
  height: 600px;
}
</style>