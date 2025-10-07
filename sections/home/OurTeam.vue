<script setup lang="ts">
import type { PersonInfo } from '@/interfaces/general'
import { useLocalizedJson } from '@/composables/useLocalizedJson'
import TeamCarousel from '@/components/team/TeamCarousel.vue'

const { data: team, loading } = useLocalizedJson<PersonInfo[]>('team')
</script>

<template>
  <TeamCarousel
    id="team"
    class="dark:bg-primary-800"
    :items="team"
    hint-key="home.team.hint"
    title-key="home.team.title"
    description-key="home.team.description"
    :show-skeleton="loading"
    show-see-all-button
    see-all-to="/equipo"
    see-all="home.team.button"
  />
</template>
