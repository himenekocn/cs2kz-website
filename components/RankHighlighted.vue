<script setup lang="ts">
import type { Record, PlayerSteam } from "~/types"

const { $api } = useNuxtApp()

const props = defineProps<{
  record: Record
  wr?: boolean
}>()

const emits = defineEmits(["toggle"])

const avatarUrl = ref("")

getAvatar()

async function getAvatar() {
  const steamId = props.record.player.id
  try {
    const player: PlayerSteam | undefined = await $api(`/players/${steamId}/steam-profile`)
    avatarUrl.value = player?.avatar_url.replace(/_medium/, "_full") || ""
  } catch (error) {
    console.error(error)
    avatarUrl.value = "https://avatars.steamstatic.com/e9546990b674d6af2c471b2daf1ccbe7b9e5b19c_medium.jpg".replace(
      /_medium/,
      "_full",
    )
  }
}
</script>

<template>
  <div
    class="overflow-x-auto flex items-center gap-4 p-3 bg-gray-800 border border-gray-700 rounded-md"
    :class="wr && 'ring-2 ring-yellow-200'">
    <div class="relative">
      <NuxtLink :to="`/profile/${record.player.id}`">
        <img
          :src="avatarUrl"
          onerror="this.onerror = null; this.src = '/img/cs2kz_medium.jpg'"
          loading="lazy"
          class="rounded-md w-20 h-20"
          :class="wr ? 'ring-2 ring-yellow-200' : 'ring-2 ring-slate-200'" >
      </NuxtLink>
      <IconMedal class="w-6 h-6 absolute top-[2px] left-[2px]" />
    </div>

    <div>
      <div class="flex w-36">
        <NuxtLink
          :to="`/profile/${record.player.id}`"
          :class="wr ? 'text-yellow-500 hover:text-yellow-300' : 'text-blue-400 hover:text-blue-300'"
          class="text-xl font-medium whitespace-nowrap"
          >{{ record.player.name }}</NuxtLink
        >
      </div>
      <p class="relative text-slate-300 text-lg">
        {{ wr ? "#1" : `#${Math.ceil(Math.random() * 1000)}` }}
      </p>
    </div>

    <div class="flex items-center gap-4 ml-6">
      <div>
        <p class="text-gray-400">Time</p>
        <p class="text-gray-100 w-20">{{ formatTime(record.time) }}</p>
      </div>

      <div>
        <p class="text-gray-400">Date</p>
        <p class="text-gray-100 italic whitespace-nowrap w-32">
          {{ toLocal(record.submitted_at) }}
        </p>
      </div>

      <UTooltip v-if="wr" text="WR Progression">
        <UButton
          variant="ghost"
          color="gray"
          :ui="{ color: { gray: { ghost: 'dark:hover:bg-yellow-400/10' } } }"
          square
          @click="emits('toggle')">
          <IconChart />
        </UButton>
      </UTooltip>
    </div>
  </div>
</template>
