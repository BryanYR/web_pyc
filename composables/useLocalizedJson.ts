// composables/useLocalizedJson.ts
import { ref, watch, onMounted } from "vue"
import { useI18n } from "vue-i18n"

export function useLocalizedJson<T>(fileName: string) {
  const { locale } = useI18n()
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const loadData = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`/json/${fileName}.${locale.value}.json`)
      if (!res.ok) throw new Error(`Error al cargar ${fileName}.${locale.value}.json`)
      data.value = (await res.json()) as T
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e
      } else {
        error.value = new Error("Error desconocido")
      }
      data.value = null
    } finally {
      loading.value = false
    }
  }

  onMounted(loadData)
  watch(locale, loadData)

  return { data, loading, error, reload: loadData }
}
