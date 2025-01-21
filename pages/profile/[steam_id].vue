<script setup lang="ts">
import type { Mode } from "~/types"

const route = useRoute()

const { query, profile, loading } = useProfile()

query.player_id = route.params.steam_id as string

const mode = ref<Mode>("classic")

function onModeChange(index: number) {
  const newMode = index === 0 ? "classic" : "vanilla"
  query.mode = newMode
  mode.value = newMode
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

      <ProfileCompletion :mode="mode" class="mb-10" />

      <ProfileRuns :mode="mode" class="mb-10" />

      <!-- <ProfileHistory class="mb-10" /> -->
    </div>
    <div v-if="!loading && !profile" class="flex px-4 py-2 items-center bg-orange-400/40 gap-2 rounded-lg">
      <IconWarning />
      <p class="flex-1 text-amber-400">Profile Not Found</p>
    </div>
  </Main>
</template>
