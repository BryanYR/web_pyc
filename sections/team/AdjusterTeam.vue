<script setup lang="ts">
import type { PersonInfo } from '@/interfaces/general'
import { useLocalizedJson } from '@/composables/useLocalizedJson'
import TeamCarousel from '@/components/team/TeamCarousel.vue'

const { data: team } = useLocalizedJson<PersonInfo[]>('team')
</script>

<template>
  <TeamCarousel
    :items="team"
    hint-key="team.adjusters.hint"
    title-key="team.adjusters.title"
    :slice-start="6"
    :show-skeleton="!team"
  />
</template>
