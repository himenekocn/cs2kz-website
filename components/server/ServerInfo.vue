<script setup lang="ts">
import type { ServerInfo } from "~/types"
defineProps<{
  info: ServerInfo
}>()
</script>

<template>
  <div class="p-2">
    <div v-if="info" class="flex items-center justify-center gap-6">
      <p>
        <span>Map: </span>
        <span class="text-gray-100 italic">{{ info.map }}</span>
      </p>
      <p>
        <span>Players:</span>
        <span class="text-gray-100">
          {{ `${info.players.online} / ${info.players.max}` }}
        </span>
      </p>
      <div class="flex items-center">
        <span>VAC:</span>
        <IconYes v-if="info.VAC" class="inline" />
        <IconNo v-else class="inline" />
      </div>
      <div class="flex items-center">
        <span>Password:</span>
        <IconYes v-if="info.hasPassword" class="inline" />
        <IconNo v-else class="inline" />
      </div>
      <p>
        <span>Version:</span>
        <span class="text-gray-100">{{ info.version }}</span>
      </p>
    </div>
  </div>
</template>
