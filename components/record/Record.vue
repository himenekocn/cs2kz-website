<script setup lang="ts">
import type { Record } from "~/types/record"

defineProps<{
  record: Record
  teleports?: boolean
}>()
</script>

<template>
  <div
    :class="record.teleports === 0 ? 'from-blue-400' : 'from-yellow-400'"
    class="grid grid-cols-12 text-center p-2 border-b border-x border-gray-700 text-gray-400 hover:bg-gray-800 transition ease-in-out bg-gradient-to-r via-transparent via-[0.5%]"
  >
    <NuxtLink
      :to="`/maps/${record.map.name}`"
      class="col-span-1 flex justify-center items-center text-slate-300 text-lg hover:text-slate-200 hover:scale-105"
    >
      {{ record.map.name }}
    </NuxtLink>

    <p class="col-span-2 flex justify-center items-center">
      {{ record.course.name }}
    </p>

    <p
      :style="{ color: getTierColor(record.course.tier) }"
      class="flex justify-center items-center text-lg font-medium"
    >
      {{ getNumTier(record.course.tier) }}
    </p>

    <NuxtLink
      :to="`/profile/${record.player.steam_id}`"
      class="col-span-2 flex justify-center items-center text-cyan-600 hover:text-cyan-400 hover:scale-105"
    >
      {{ record.player.name }}
    </NuxtLink>

    <p class="flex justify-center items-center text-slate-300">
      {{ formatTime(record.time) }}
    </p>

    <p class="col-span-2 flex justify-center items-center italic">
      {{ record.server.name }}
    </p>

    <p class="flex justify-center items-center">
      {{ record.teleports }}
    </p>

    <p class="col-span-2 flex justify-center items-center">
      {{ toLocal(record.created_on) }}
    </p>
  </div>
</template>
