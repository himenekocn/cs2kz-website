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
    await $api("/auth/web", {
      async onResponseError({ response }) {
        if (response.status >= 400) {
          player.value = null
        }
      },

      credentials: "include",
    })
    setTimeout(verifySession, 1000 * 25)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="app dark bg-gray-900">
    <NuxtLoadingIndicator />

    <TheHeader />

    <div class="p-2 mx-2 lg:mx-auto lg:w-max mt-8 rounded-md text-slate-800 bg-orange-400/70">
      {{ $t("common.testingAlert") }}
    </div>

    <NuxtPage />
  </div>
</template>

<style>
.app {
  font-family: "Akshar", sans-serif;
}
</style>
