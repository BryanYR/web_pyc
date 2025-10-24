<script setup lang="ts">
definePageMeta({ middleware: ['auth'], layout: 'dashboard' })
import { useBlogStore } from '@/stores/blogStore'
import BlogForm from '@/components/dashboard/blog/BlogForm.vue'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const blog = useBlogStore()
const toast = useToast()

const initial = ref<{
  title: string
  shortDescription: string
  isPublished: '0' | '1'
  content: string
}>({ title: '', shortDescription: '', isPublished: '0', content: '' })

async function onSubmit(payload: any) {
  const res = await blog.create(payload)
  if (res.ok) {
    toast.success('Post creado correctamente')
    return navigateTo('/dashboard')
  } else {
    toast.error(res.message || 'No se pudo crear')
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
    <BlogForm
      :initial="initial"
      :loading="blog.loading"
      heading="Nuevo post"
      submitText="Guardar"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </section>
</template>
