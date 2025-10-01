<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'primary',
})

import Divisions from '@/sections/services/Divisions.vue'
import Prevention from '@/sections/services/Prevention.vue'
import Sinister from '@/sections/services/Sinister.vue'
import Risk from '@/sections/services/Risk.vue'
import Recoveries from '@/sections/services/Recoveries.vue'
import Support from '@/sections/services/Support.vue'
</script>

<template>
  <div class="w-full pt-20">
    <Divisions />
    <Prevention />
    <Sinister />
    <Recoveries />
    <Risk />
    <Support />
  </div>
</template>
