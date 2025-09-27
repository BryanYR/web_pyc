<script setup lang="ts">
definePageMeta({
  layout: "default",
  headerBg: "primary",
});
import ManagementTeam from '@/sections/team/ManagementTeam.vue';
import AdjusterTeam from '@/sections/team/AdjusterTeam.vue';
import Inspectors from '@/sections/team/Inspectors.vue';
</script>

<template>
    <div class="w-full py-8">
        <ManagementTeam />
        <AdjusterTeam />
        <Inspectors />
    </div>
</template>