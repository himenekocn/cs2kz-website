<script lang="ts" setup>
import type { PlayerSteam } from "./types"

const player = usePlayer()
const kzPlayer = useCookie<PlayerSteam>("kz-player")

player.value = kzPlayer.value || null
</script>

<template>
  <div class="app dark bg-gray-900">
    <NuxtLoadingIndicator />

    <TheHeader />

    <NuxtPage />

    <div class="h-[300px]" />
  </div>
</template>

<style>
.app {
  font-family: "Akshar", sans-serif;
}
</style>
