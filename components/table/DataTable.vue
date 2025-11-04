<script setup lang="ts">
import Base from '@/components/button/Base.vue'
import Select from '@/components/form/Select.vue'

interface Props<T = any> {
  items: T[]
  page: number
  perPage: number
  total?: number
  loading?: boolean
  perPageOptions?: number[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  perPageOptions: () => [6, 15, 25],
  columns: 1,
})

const emit = defineEmits<{
  (e: 'update:page', v: number): void
  (e: 'update:perPage', v: number): void
}>()

function prev() {
  if (props.page > 1) emit('update:page', props.page - 1)
}

function next(totalPages?: number) {
  if (!totalPages || props.page < totalPages)
    emit('update:page', props.page + 1)
}

function onPerPageChange(v: any) {
  const num = typeof v === 'number' ? v : Number(v)
  if (!Number.isNaN(num)) emit('update:perPage', num)
}

function totalPages() {
  if (props.total && props.perPage)
    return Math.max(1, Math.ceil(props.total / props.perPage))
  return undefined
}

</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="overflow-x-auto bg-white rounded-lg border">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <slot name="head">
              <th></th>
            </slot>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <template v-if="loading">
            <tr v-for="i in 4" :key="'sk-'+i">
              <td v-for="c in columns" :key="`sk-${i}-${c}`" class="px-4 py-3">
                <div class="animate-pulse space-y-2">
                  <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </td>
            </tr>
          </template>
          <tr v-else-if="!items || items.length === 0">
            <td class="px-4 py-3 text-sm text-gray-500" :colspan="columns">
              Sin resultados
            </td>
          </tr>
          <template v-else>
            <slot
              name="row"
              v-for="(item, idx) in items"
              :key="idx"
              :item="item"
            />
          </template>
        </tbody>
      </table>
    </div>
    <div
      class="p-3 flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <div class="flex items-center gap-2 text-sm">
        <span>Mostrar</span>
        <Select
          :model-value="perPage"
          :options="perPageOptions.map((v) => ({ label: String(v), value: v }))"
          @update:modelValue="onPerPageChange"
        />
        <span>por página</span>
      </div>
      <div v-if="!total || total > perPage" class="flex items-center gap-2">
        <Base
          :classes="'px-3 py-1'"
          @click="prev"
          :disabled="page === 1 || loading"
          >Anterior</Base
        >
        <div class="text-sm text-gray-600">
          Página {{ page
          }}<span v-if="totalPages()"> de {{ totalPages() }}</span>
        </div>
        <Base
          :classes="'px-3 py-1'"
          @click="next(totalPages())"
          :disabled="loading"
          >Siguiente</Base
        >
      </div>
    </div>
  </div>
</template>
