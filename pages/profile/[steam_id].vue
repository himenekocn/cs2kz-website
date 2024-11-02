<script setup lang="ts">
import type { Mode } from "~/types"
import SteamID from "steamid"

definePageMeta({
  validate: async (route) => {
    try {
      const steamID = new SteamID(route.params.steam_id as string)
      return steamID.isValidIndividual()
    } catch (error) {
      return false
    }
  },
})

const { query } = useRecords()

const mode = ref<Mode>("classic")

function onModeChange(index: number) {
  const newMode = index === 0 ? "classic" : "vanilla"
  mode.value = newMode
  query.mode = newMode
}
</script>
<template>
  <Main>
    <div class="max-w-5xl mx-auto text-gray-300">
      <UTabs
        class="mb-6"
        :items="[
          { label: $t('common.mode.ckz') },
          { label: $t('common.mode.vnl') },
        ]"
        :ui="{
          list: { width: 'w-48', tab: { size: 'text-xl', padding: 'px-0' } },
          wrapper: 'relative space-y-0',
        }"
        :default-index="0"
        @change="onModeChange"
      />

      <ProfileCard :mode="mode" class="mb-10" />

      <ProfileCompletion :mode="mode" class="mb-10" />

      <ProfileRuns class="mb-10" />

      <ProfileHistory :mode="mode" class="mb-10" />
    </div>
  </Main>
</template>
