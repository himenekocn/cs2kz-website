<script setup lang="ts">
import type { Record } from "~/types/record"
import type { Player } from "~/types/player"
const props = defineProps<{
  record: Record
  wr?: boolean
}>()
const avatarUrl = ref("")
getAvatar()

async function getAvatar() {
  const steamId = props.record.player.steam_id
  const player: Player | undefined = await $api(`/players/${steamId}/steam`)
  avatarUrl.value = player?.avatar_url.replace(/(\.jpg)$/, "_full" + "$1") || ""
}
</script>

<template>
  <div
    class="overflow-x-auto flex items-center gap-4 p-3 bg-gray-800 border border-gray-700 rounded-md"
  >
    <NuxtLink :to="`/profile/${record.player.steam_id}`">
      <img
        :src="avatarUrl"
        class="rounded-md w-16"
        :class="wr ? 'ring-2 ring-yellow-200' : 'ring-2 ring-slate-200'"
      />
    </NuxtLink>

    <div>
      <div class="flex items-center">
        <NuxtLink
          :to="`/profile/${record.player.steam_id}`"
          :class="
            wr
              ? 'text-yellow-500 hover:text-yellow-300'
              : 'text-blue-400 hover:text-blue-300'
          "
          class="text-xl font-medium whitespace-nowrap"
          >{{ record.player.name }}</NuxtLink
        >
        <IconMedal v-if="wr" />
      </div>
      <p class="relative text-slate-300 text-lg">
        {{ wr ? "#1" : `#${Math.ceil(Math.random() * 1000)}` }}
      </p>
    </div>

    <div class="flex items-center gap-10 ml-6">
      <div class="">
        <p class="text-gray-400">Time</p>
        <p class="text-gray-100">{{ formatTime(record.time) }}</p>
      </div>
      <div>
        <p class="text-gray-400">Server</p>
        <p class="text-gray-100 italic whitespace-nowrap">
          {{ record.server.name }}
        </p>
      </div>

      <div>
        <p class="text-gray-400">TPs</p>
        <p class="text-gray-100 italic">{{ record.teleports }}</p>
      </div>

      <div>
        <p class="text-gray-400">Date</p>
        <p class="text-gray-100 italic whitespace-nowrap">
          {{ toLocal(record.created_on) }}
        </p>
      </div>
    </div>
  </div>
</template>
