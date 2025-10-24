<script setup lang="ts">
definePageMeta({ middleware: ['auth'], layout: 'dashboard' })
import { onMounted, ref } from 'vue'
import BlogForm from '@/components/dashboard/blog/BlogForm.vue'
import { useBlogStore } from '@/stores/blogStore'
import { getPost } from '@/api/blogs'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const blog = useBlogStore()
const toast = useToast()

const initial = ref<any | null>(null)
const loadingLocal = ref(true)

onMounted(async () => {
  const id = route.params.id as string
  const res = await getPost(id)
  console.log('res', res)
  if (res.ok) {
    initial.value = {
      title: res.data.title,
      shortDescription: res.data.shortDescription,
      isPublished: res.data.isPublished,
      content: res.data.content,
      author: res.data.author,
      imageUrl: res.data.imageUrl,
      fileBlog: res.data.fileBlog,
    }
  } else {
    toast.error(res.message || 'No se pudo cargar el post')
    return navigateTo('/dashboard')
  }
  loadingLocal.value = false
})

async function onSubmit(payload: any) {
  const id = route.params.id as string
  const res = await blog.update(id, payload)
  if (res.ok) {
    toast.success('Post actualizado correctamente')
    return navigateTo('/dashboard')
  } else {
    toast.error(res.message || 'No se pudo actualizar')
  }
}

function onCancel() {
  navigateTo('/dashboard')
}
</script>

<template>
  <section
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-2xl my-4"
  >
    <div v-if="loadingLocal" class="text-gray-500">Cargando…</div>
    <BlogForm
      v-else
      :initial="initial"
      :loading="blog.loading"
      heading="Editar post"
      submitText="Actualizar"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </section>
</template>
