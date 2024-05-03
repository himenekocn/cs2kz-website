<script setup lang="ts">
import type { Record } from "~/types/record"

defineProps<{
  records: Record[]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="w-full mt-8 bg-gray-900 border border-gray-700 text-center text-gray-300"
    >
      <thead>
        <tr>
          <th class="py-1">{{ $t("records.title.map") }}</th>
          <th class="py-1">{{ $t("records.title.course") }}</th>
          <th class="py-1">{{ $t("records.title.tier") }}</th>
          <th class="py-1">{{ $t("records.title.player") }}</th>
          <th class="py-1">{{ $t("records.title.time") }}</th>
          <th class="py-1">{{ $t("records.title.server") }}</th>
          <th class="py-1">{{ $t("records.title.teleports") }}</th>
          <th class="py-1">{{ $t("records.title.date") }}</th>
        </tr>
      </thead>
      <tbody v-if="records.length > 0">
        <tr
          v-for="record in records"
          :record="record"
          :key="record.id"
          class="border border-gray-700 text-gray-400 hover:bg-gray-800"
        >
          <td
            :class="
              record.teleports === 0 ? 'from-blue-400' : 'from-yellow-400'
            "
            class="py-2 px-2 lg:px-0 transition ease-in-out bg-gradient-to-r to-[3%]"
          >
            <NuxtLink
              :to="`/maps/${record.map.name}`"
              class="text-slate-300 font-medium text-lg hover:text-slate-200"
            >
              {{ record.map.name }}
            </NuxtLink>
          </td>
          <td class="py-2 px-2 lg:px-0 lg:p-0 whitespace-nowrap">
            {{ record.course.name }}
          </td>
          <td
            :style="{ color: getTierColor(record.course.tier) }"
            class="py-2 px-2 lg:px-0 text-lg font-medium"
          >
            {{ getNumTier(record.course.tier) }}
          </td>
          <td>
            <NuxtLink
              :to="`/profile/${record.player.steam_id}`"
              class="py-2 px-2 lg:px-0 text-cyan-600 whitespace-nowrap hover:text-cyan-400"
            >
              {{ record.player.name }}
            </NuxtLink>
          </td>
          <td class="py-2 px-2 lg:px-0 text-slate-300">
            {{ formatTime(record.time) }}
          </td>
          <td class="py-2 px-2 lg:px-0 italic whitespace-nowrap">
            {{ record.server.name }}
          </td>
          <td class="py-2 px-2 lg:px-0">
            {{ record.teleports }}
          </td>
          <td class="py-2 px-2 lg:px-0 whitespace-nowrap">
            {{ toLocal(record.created_on) }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        No Data
      </tbody>
    </table>
  </div>
</template>
