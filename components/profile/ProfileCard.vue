<script setup lang="ts">
import type { Mode, PlayerSteam } from "~/types"

const props = defineProps<{
  mode: Mode
}>()

const { $api } = useNuxtApp()

const route = useRoute()

const { query, profile } = useProfile()

const avatarUrl = ref("")
const profileUrl = ref("")

// query.player_id = "76648292156514919"
query.player_id = route.params.steam_id as string

watch(
  () => props.mode,
  (mode) => {
    query.mode = mode
  },
)

getSteamProfile()

async function getSteamProfile() {
  try {
    const player: PlayerSteam | undefined = await $api(`/players/${route.params.steam_id}/steam-profile`)
    avatarUrl.value = player?.avatar_url.replace(/_medium/, "_full") || ""
    profileUrl.value = player?.profile_url || ""
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div v-if="profile" class="flex gap-2 lg:gap-4 p-4 border border-gray-700 rounded-md lg:text-lg">
    <img
      onerror="this.onerror = null; this.src = '/img/cs2kz_medium.jpg'"
      :src="avatarUrl"
      class="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-md ring-2 ring-blue-400/30" />

    <div class="flex flex-col gap-2 lg:gap-5">
      <div class="flex items-center gap-1">
        <p class="text-2xl font-semibold max-w-56 truncate text-cyan-600">{{ profile.name }}</p>
        <UButton square variant="ghost" @click="navigateTo(profileUrl, { external: true, open: { target: '_blank' } })">
          <IconSteam class="w-5 h-5" />
        </UButton>
      </div>

      <p>
        <span class="text-gray-400">{{ $t("profile.info.joinedOn") }}: </span>
        <span class="font-semibold mr-1">{{ toLocal(profile.first_joined_at, true) }}</span>
      </p>

      <div>
        <span class="mr-1 text-gray-400">{{ $t("profile.info.rating") }}:</span>
        <span class="font-medium">
          {{ seperateThousands(profile.rating) }}
        </span>
      </div>
    </div>
  </div>
</template>
