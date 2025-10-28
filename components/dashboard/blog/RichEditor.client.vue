<template>
  <ClientOnly>
    <div v-if="isReady">
      <Toolbar :editor="editor" :defaultConfig="toolbarConfig" />
      <Editor
        v-model="content"
        :defaultConfig="editorConfig"
        @onCreated="onCreated"
        style="height: 500px"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { uploadImage } from '@/api/blogs'

const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
const content = ref(props.modelValue)

watch(() => props.modelValue, (v) => { if (v !== content.value) content.value = v })
watch(content, (v) => emit('update:modelValue', v))


const editor = ref<any>(null)
const isReady = ref(false)

let Editor: any, Toolbar: any
let editorInstance: any = null

onMounted(async () => {
  const core = await import('@wangeditor/editor')
  const vueEditor = await import('@wangeditor/editor-for-vue')

  const { i18nChangeLanguage } = core
  i18nChangeLanguage('en') // idioma (es-ES aún da error en algunos builds)

  Editor = vueEditor.Editor
  Toolbar = vueEditor.Toolbar

  isReady.value = true
})

const toolbarConfig = {
  excludeKeys: ['insertVideo', 'insertImage', 'fullScreen', 'uploadVideo', 'group-video'],
}

const editorConfig = {
  placeholder: 'Escribe tu contenido aquí...',
  MENU_CONF: {
    uploadImage: {
      customUpload: async (file: File, insertFn: (url: string, alt: string, href: string) => void) => {
        console.log('Subiendo imagen:', file)
        const res = await uploadImage(file);
        if(res.ok){
          // ✅ Inserta manualmente la imagen en el editor
          insertFn(res.data.url, 'Imagen subida', res.data.url)
        } else {
          console.error('Error al subir la imagen:', res);
        }
      },
    },
  },
}

const onCreated = (instance: any) => {
  editorInstance = instance
  editor.value = instance
  console.log('Editor creado ✅')
}

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy()
    editorInstance = null
  }
})
</script>


<style>
@import '@wangeditor/editor/dist/css/style.css';
#blog-content{
  border: 1px solid #dddddd;
  border-radius: 5px;
}
.w-e-toolbar{
  border-radius: 5px;
  border-bottom: 1px solid #dddddd;
}
.w-e-text-container{
border-radius: 5px;
}
</style>
