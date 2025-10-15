<script>
import { useAuthStore } from '@/stores/authStore';
const auth = useAuthStore()

onMounted(() => {
  auth.hydrate()
})
</script>
<template>
  <NuxtLayout >
    <NuxtPage />
  </NuxtLayout>
</template>