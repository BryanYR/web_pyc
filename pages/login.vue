<script setup lang="ts">
definePageMeta({ layout: 'blank' })
import { ref } from 'vue'
import Base from '@/components/button/Base.vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification'
import InputField from '@/components/form/InputField.vue'

const auth = useAuthStore()
const toast = useToast()
const email = ref('')
const password = ref('')

async function onSubmit() {
  const res = await auth.login({ email: email.value, password: password.value })
  if (res.ok) {
    toast.success('Inicio de sesión exitoso')
    navigateTo('/dashboard')
  } else {
    toast.error(res.message || 'No se pudo iniciar sesión')
  }
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <!-- Imagen lado izquierdo -->
    <div class="relative z-0 md:h-auto md:block login-hero">
      <img
        src="/images/logos/pyc_logo.svg"
        alt="PYC"
        class="absolute top-5 left-5 h-10 mb-2 z-10"
      />
      <img
        src="/images/home/pyc_home_1.webp"
        alt="Login"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black opacity-30"></div>
    </div>
    <!-- Formulario lado derecho -->
    <div
      class="relative z-20 -mt-14 sm:-mt-16 rounded-t-2xl bg-white md:bg-transparent md:mt-0 flex items-center justify-center px-4 md:px-6 login-form-wrap"
    >
      <div
        class="w-full max-w-md p-2 sm:p-6 md:rounded-none md:shadow-none md:border-0"
      >
        <div class="flex flex-col items-center mb-6">
          <h1 class="text-2xl font-semibold">Iniciar sesión</h1>
        </div>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <InputField
            v-model="email"
            label="Correo"
            id="email"
            type="email"
            placeholder="Correo electrónico"
            required
          />
          <InputField
            v-model="password"
            label="Contraseña"
            id="password"
            type="password"
            placeholder="Contraseña"
            required
          />
          <Base
            class="w-full"
            :classes="'w-full justify-center'"
            type="submit"
            :disabled="auth.loading"
          >
            <span v-if="auth.loading">Entrando…</span>
            <span v-else>Entrar</span>
          </Base>
        </form>
        <p v-if="auth.error" class="mt-3 text-sm text-red-600">
          {{ auth.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-height: 599px) and (max-width: 767px) {
  .login-hero {
    display: none;
  }
  .login-form-wrap {
    margin-top: 0 !important;
  }
}
</style>
