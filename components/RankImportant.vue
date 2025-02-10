<script setup lang="ts">
import type { Record, PlayerSteam, Teleports } from "~/types"

const { $api } = useNuxtApp()

const props = defineProps<{
  hasTeleports: Teleports
  record: Record
}>()

const wr = computed(() => {
  if (props.hasTeleports === "overall") {
    return props.record.nub_rank === 1
  } else {
    return props.record.pro_rank === 1
  }
})

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
  }
}
</script>

<template>
  <div
    class="overflow-x-auto flex items-center gap-4 p-3 bg-gradient-to-r from-yellow-400/15 via-yellow-500/15 to-yellow-600/15 border border-gray-700 rounded-md"
    :class="wr && 'ring-2 ring-yellow-200'"
  >
    <div class="relative">
      <NuxtLink :to="`/profile/${record.player.id}`">
        <TheImage :src="avatarUrl" class="w-20 h-20 object-cover rounded-md ring-1 ring-slate-400" />
      </NuxtLink>
      <IconMedalFirst v-if="wr" class="w-6 h-6 absolute top-[2px] left-[2px]" />
    </div>

    <div>
      <div class="flex w-36">
        <NuxtLink
          :to="`/profile/${record.player.id}`"
          :class="wr ? 'text-yellow-600 hover:text-yellow-400' : 'text-cyan-600 hover:text-cyan-400'"
          class="text-xl font-medium whitespace-nowrap"
          >{{ record.player.name }}</NuxtLink
        >
      </div>
      <p class="relative text-slate-300 text-lg">
        {{ `#${hasTeleports === "overall" ? record.nub_rank : record.pro_rank}` }}
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
          @click="emits('toggle')"
        >
          <IconChart />
        </UButton>
      </UTooltip>
    </div>
  </div>
</template>
