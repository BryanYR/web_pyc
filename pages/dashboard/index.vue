<script setup lang="ts">
definePageMeta({ middleware: ['auth'], layout: 'dashboard' })
import { ref, onMounted, computed } from 'vue'
import { updateBlog } from '@/api/blogs'
import { useBlogStore } from '@/stores/blogStore'
import Base from '@/components/button/Base.vue'
import DataTable from '@/components/table/DataTable.vue'
// Blog CRUD moved to dedicated pages

const blog = useBlogStore()

// modal/form moved to /dashboard/blog and /dashboard/blog/[id]

const page = ref(1)
const perPage = ref(6)

const hasItems = computed(
  () => Array.isArray(blog.items) && blog.items.length > 0
)

const confirmOpen = ref(false)
const targetId = ref<number | null>(null)
const currentPublished = ref<'0' | '1' | null>(null)
const currentTitle = ref<string | null>(null)
const currentShortDescription = ref<string | null>(null)
const currentAuthor = ref<string | null>(null)
const toggleLoadingId = ref<number | null>(null)
const isToggling = computed(() => toggleLoadingId.value !== null)

function askDeactivate(row: any) {
  targetId.value = row.postId
  currentPublished.value = row.isPublished
  currentTitle.value = row.title || null
  currentShortDescription.value = row.shortDescription || null
  currentAuthor.value = row.author || null

  confirmOpen.value = true
}

async function onDeactivate() {
  if (targetId.value == null) return
  try {
    blog.loading = true
    toggleLoadingId.value = targetId.value
    // Toggle publish status: if currently '1' (published), send '0' to deactivate; otherwise send '1' to publish
    const nextStatus = currentPublished.value === '1' ? '0' : '1'
    const res = await updateBlog(targetId.value, {
      isPublished: nextStatus,
      title: currentTitle.value || '',
      shortDescription: currentShortDescription.value || '',
      author: currentAuthor.value || '',
    })
    if (res.ok) {
      await blog.fetch({
        filter: 0,
        page: page.value,
        perPage: perPage.value,
      })
    }
  } finally {
    confirmOpen.value = false
    targetId.value = null
    currentPublished.value = null
    currentTitle.value = null
    currentShortDescription.value = null
    toggleLoadingId.value = null
    blog.loading = false
  }
}

function openCreate() {
  navigateTo('/dashboard/blog')
}

function openEdit(row: any) {
  navigateTo(`/dashboard/blog/${row.postId}`)
}

onMounted(() => {
  blog.fetch({
    filter: 0,
    page: page.value,
    perPage: perPage.value,
  })
})
</script>

<template>
  <div>
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-2xl my-4"
    >
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-semibold text-black">Gestión de posts</h1>
        <Base :classes="'px-4 py-2'" @click="openCreate">Nuevo Post</Base>
      </div>

      <DataTable
        :items="blog.items"
        :page="page"
        :perPage="perPage"
        :total="blog.total"
        :loading="blog.loading"
        :columns="4"
        @update:page="
          (p) => {
            page = p
            blog.fetch({ filter: 0, page: page, perPage })
          }
        "
        @update:perPage="
          (pp) => {
            perPage = pp
            page = 1
            blog.fetch({ filter: 0, page: page, perPage })
          }
        "
      >
        <template #head>
          <th
            class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Título
          </th>
          <th
            class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Publicado
          </th>
          <th
            class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Creado
          </th>
          <th
            class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </template>
        <template #row="{ item: row }">
          <tr :key="row.postId">
            <td class="px-4 py-3 text-sm text-gray-900">{{ row.title }}</td>
            <td class="px-4 py-3 text-sm">
              <span
                :class="
                  row.isPublished === '1'
                    ? 'text-white bg-primary-700'
                    : 'bg-secondary-500 text-gray-100'
                "
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ row.isPublished === '1' ? 'Publicado' : 'Borrador' }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm text-gray-500">
              {{ new Date(row.created_at).toLocaleDateString() }}
            </td>
            <td class="px-4 py-3 text-sm">
              <div class="flex gap-2">
                <button
                  class="bg-primary-600 rounded-full px-3 py-2 hover:underline text-white"
                  @click="openEdit(row)"
                >
                  Editar
                </button>
                <button
                  class=" rounded-full px-3 py-2 hover:underline text-white inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  :class="row.isPublished === '1' ? 'bg-rose-600' : 'bg-secondary-600'"
                  :disabled="toggleLoadingId === row.postId || blog.loading"
                  @click.prevent="askDeactivate(row)"
                >
                  <template v-if="toggleLoadingId === row.postId">
                    <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Procesando...
                  </template>
                  <template v-else>
                    {{ row.isPublished === '1' ? 'Desactivar' : 'Publicar' }}
                  </template>
                </button>
              </div>
            </td>
          </tr>
        </template>
      </DataTable>

      <!-- Empty state -->
      <div
        v-if="!blog.loading && !hasItems"
        class="mt-6 border border-dashed rounded-lg p-8 text-center text-gray-600"
      >
        <p class="mb-4">Aún no hay posts.</p>
        <Base :classes="'px-4 py-2'" @click="openCreate">Crear el primero</Base>
      </div>
    </section>
    <!-- Confirm modal -->
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="confirmOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/40"
          @click="confirmOpen = false"
        ></div>
        <div class="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-5">
          <div class="flex flex-col items-center gap-3">
            <div
              class="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xl"
            >
              !
            </div>
            <div>
              <h3 class="text-base font-semibold text-gray-900">
                {{ currentPublished === '1' ? '¿Está seguro que desea desactivar este post?' : '¿Está seguro que desea activar este post?' }}
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                Podrá cambiar su estado nuevamente más adelante.
              </p>
            </div>
          </div>
          <div class="my-5 flex justify-center gap-2">
            <button
              class="px-4 py-2 rounded border"
              @click="confirmOpen = false"
              :disabled="isToggling"
            >
              Cancelar
            </button>
            <button
              class="px-4 py-2 rounded bg-rose-600 text-white inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="isToggling"
              @click="onDeactivate"
            >
              <template v-if="isToggling">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Procesando...
              </template>
              <template v-else>
                {{ currentPublished === '1' ? 'Desactivar' : 'Publicar' }}
              </template>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
