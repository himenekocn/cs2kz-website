<script setup lang="ts">
import type { Mode } from "~/types"
import SteamID from "steamid"

// const route = useRoute()

const { query, profile } = useProfile()

const mode = ref<Mode>("classic")

definePageMeta({
  validate: async (route) => {
    try {
      const steamID = new SteamID(route.params.steam_id as string)
      return steamID.isValidIndividual()
    } catch (error) {
      console.log(error)
      return false
    }
  },
})

// query.player_id = route.params.steam_id as string

query.player_id = "76648292156514919"

function onModeChange(index: number) {
  const newMode = index === 0 ? "classic" : "vanilla"
  mode.value = newMode
  query.mode = newMode
}
</script>
<template>
  <Main>
    <div v-if="profile" class="max-w-5xl mx-auto text-gray-300">
      <UTabs
        class="mb-6"
        :items="[{ label: $t('common.mode.ckz') }, { label: $t('common.mode.vnl') }]"
        :ui="{
          list: { width: 'w-48', tab: { size: 'text-xl', padding: 'px-0' } },
          wrapper: 'relative space-y-0',
        }"
        :default-index="0"
        @change="onModeChange" />

      <ProfileCard :profile="profile" class="mb-10" />

      <ProfileCompletion class="mb-10" />

      <ProfileRuns :mode="mode" class="mb-10" />

      <ProfileHistory class="mb-10" />
    </div>

    <div v-else class="text-xl text-gray-300">No Data</div>
  </Main>
</template>
