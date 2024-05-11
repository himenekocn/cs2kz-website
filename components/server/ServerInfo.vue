<script setup lang="ts">
import type { ServerInfo } from "~/types/server"
defineProps<{
  info: ServerInfo | null
}>()
</script>

<template>
  <td colspan="6" class="py-2">
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
        <IconYes class="inline" v-if="info.VAC" />
        <IconNo class="inline" v-else />
      </div>

      <div class="flex items-center">
        <span>Password:</span>
        <IconYes class="inline" v-if="info.hasPassword" />
        <IconNo class="inline" v-else />
      </div>

      <p>
        <span>Version:</span>
        <span class="text-gray-100">{{ info.version }}</span>
      </p>
    </div>
    <span v-else>{{ $t("common.no_data") }}</span>
  </td>
</template>
