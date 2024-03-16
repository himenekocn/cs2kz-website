<script lang="ts" setup>
import type { Player } from "./types/player"

const player = usePlayer()
const kzPlayer = useCookie<Player>("kz-player")

player.value = kzPlayer.value || null
</script>

<template>
  <div class="dark main bg-gray-900">
    <NuxtLoadingIndicator />

    <TheHeader />

    <NuxtPage />
  </div>
</template>

<style>
.main {
  font-family: Gambetta, sans-serif;
}
</style>
