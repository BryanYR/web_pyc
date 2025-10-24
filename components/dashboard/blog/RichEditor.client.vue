<template>
  <ClientOnly>
    <QuillEditor
      v-model:content="content"
      content-type="html"
      theme="snow"
      :toolbar="toolbarOptions"
      :modules="modules"
      @ready="onEditorReady"
    />
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { uploadImage } from '@/api/blogs'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
const content = ref(props.modelValue)

watch(() => props.modelValue, (v) => { if (v !== content.value) content.value = v })
watch(content, (v) => emit('update:modelValue', v))

const modules = ref([]);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['image', 'link', 'video'],
  ['table'],
];

function base64ToFile(base64, filename) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const imageUploaderConfig = {
  upload: async (fileOrBase64) => {
    try {
      let file = fileOrBase64;

      // Si viene en base64 (string), convertirlo a File
      if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:image')) {
        file = base64ToFile(fileOrBase64, `image-${Date.now()}.png`);
      }

      // Subir como archivo
      const url = await uploadImage(file);
      if (url.ok) {
        console.log('✅ Imagen subida, URL:', url);
        return url.data.url;
      }
    } catch (err) {
      console.error('❌ Error subiendo imagen:', err);
      throw new Error('Upload failed');
    }
  },
};

onMounted(async () => {
  if (process.client) {
    const Quill = (await import('quill')).default;
    
    const betterTable = (await import('quill-better-table')).default;
    const tableUI = (await import('quill-table-ui')).default;
    const imageUploader = (await import('quill-image-uploader')).default;

    // Registrar módulos antes de pasarlos a vue-quill
    Quill.register({
      'modules/better-table': betterTable,
      'modules/tableUI': tableUI,
      'modules/imageUploader': imageUploader,
    }, true);

    modules.value = [
      { name: 'better-table', module: betterTable },
      { name: 'tableUI', module: tableUI, options: {} },
      { name: 'imageUploader', module: imageUploader, options: imageUploaderConfig },
    ];

    console.log('✅ Módulos de Quill registrados:', modules.value);
  }
});

const onEditorReady = (quill) => {
  // Asignar el handler para el botón de imagen
  quill.getModule('toolbar').addHandler('image', () => {
    const range = quill.getSelection(true);
    
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      
      if (file) {
        try {
          const url = await imageUploaderConfig.upload(file);
          quill.insertEmbed(range.index, 'image', url);
        } catch (error) {
          console.error("Error inserting image", error);
        }
      }
    });

    fileInput.click();
  });
};
</script>

<style>
.ql-editor {
  min-height: 400px;
}
</style>