<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification'

const auth = useAuthStore()
const toast = useToast()
const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
// Service does not provide avatar URL; derive initials from user name
const initials = computed(() => {
  const name = auth.user?.name || ''
  if (!name.trim()) return '?'
  // Take first letter of first word; extend to multiple initials if desired
  return name.trim().charAt(0).toUpperCase()
})

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return
  const target = e.target as Node
  const clickedInsideMenu = !!menuRef.value && menuRef.value.contains(target)
  const clickedOnTrigger = !!triggerRef.value && triggerRef.value.contains(target)
  if (!clickedInsideMenu && !clickedOnTrigger) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})

async function onLogout() {
  try {
    await auth.logout()
    toast.success('Sesión cerrada correctamente')
  } catch (e) {
    console.error('Logout error:', e)
    toast.error('No se pudo cerrar sesión')
  } finally {
    open.value = false
    navigateTo('/login')
  }
}
</script>
<template>
  <header class="w-full border-b bg-primary-700 dark:bg-primary-900 backdrop-blur sticky top-0 z-10 h-16">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/images/logos/pyc_logo.svg" alt="PYC" class="h-10 w-auto" />
        <span class="sr-only">Inicio</span>
      </NuxtLink>
      <div class="relative flex items-center gap-3" @keydown.escape="open = false">
        <ClientOnly>
          <span class="text-sm font-medium text-white/90" v-if="auth.user?.name">{{ auth.user.name }}</span>
        </ClientOnly>
        <button
          ref="triggerRef"
          @click="open = !open"
          class="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ClientOnly>
            <div
            class="h-8 w-8 rounded-full bg-secondary-700 text-white flex items-center justify-center ring-1 ring-gray-200 font-semibold"
          >
            {{ initials }}
          </div>
          </ClientOnly>
        </button>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="open"
            ref="menuRef"
            class="absolute right-0 top-10 w-40 rounded-md bg-white shadow-lg ring-1 ring-black/5 py-1"
          >
            <button
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              @click="onLogout"
            >
              Cerrar sesión
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
