<script lang="ts" setup>
import type { Player } from "./types/player"

const player = usePlayer()
const kzPlayer = useCookie<Player>("kz-player")

player.value = kzPlayer.value || null
</script>

<template>
  <div class="app dark bg-gray-900">
    <NuxtLoadingIndicator />

    <TheHeader />

    <NuxtPage />

    <div class="h-[300px]"></div>
  </div>
</template>

<style>
.app {
  font-family: "Akshar", sans-serif;
}
</style>
