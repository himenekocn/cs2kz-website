<script lang="ts" setup>
import type { PlayerSteam } from "./types"

const { $api } = useNuxtApp()

const player = usePlayer()
const kzPlayer = useCookie<PlayerSteam>("kz-player")

if (kzPlayer.value) {
  player.value = kzPlayer.value
  verifySession()
}

async function verifySession() {
  try {
    await $api("/auth/verify-session", {
      async onResponseError({ response }) {
        if (response.status >= 400) {
          player.value = null
          navigateTo("/")
        }
      },
      credentials: "include",
    })
    setTimeout(verifySession, 1000 * 3)
  } catch (error) {
    console.log()
  }
}
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
