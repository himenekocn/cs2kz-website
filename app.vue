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

    <div class="px-4 container mx-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.app {
  font-family: "Akshar";
}
</style>
