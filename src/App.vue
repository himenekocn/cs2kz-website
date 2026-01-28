<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Cookies from 'universal-cookie'
import { usePlayerStore } from './stores/player'
import { api, getPlayerFromQuery, setPlayerFromQuery } from './utils'
import TheHeader from './components/TheHeader.vue'
import { useColorMode } from '@vueuse/core'

const playerStore = usePlayerStore()

const cookies = new Cookies(null, { path: '/' })

const colorMode = useColorMode()
colorMode.value = 'dark'

playerStore.player = cookies.get('kz-player') || null

// 从 GET 接口设置 kz-player
onMounted(async () => {
  const player = await setPlayerFromQuery()
  if (player) {
    playerStore.player = player
    cookies.set('kz-player', player)
  }
})

if (playerStore.player) {
  verifySession()
}

async function verifySession() {
  try {
    const player = await getPlayerFromQuery()
    if (player) {
      playerStore.player = player
      cookies.set('kz-player', player)
    }
    setTimeout(verifySession, 1000 * 30)
    /* eslint-disable */
  } catch (error: any) {
    /* eslint-enable */
    if (error.response && error.response.status === 401) {
      playerStore.player = null
      cookies.remove('kz-player')
    }
  }
}
</script>

<template>
  <UApp>
    <TheHeader />
    <Suspense>
      <RouterView />
    </Suspense>
  </UApp>
</template>
