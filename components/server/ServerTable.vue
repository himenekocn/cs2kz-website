<script setup lang="ts">
import type { ServerWithInfo } from "~/types/server"

defineProps<{
  servers: ServerWithInfo[] | null
}>()

const uiButton = {
  padding: { sm: "p-1" },
  variant: { ghost: "dark:hover:bg-green-400/40" },
}

function connect(ip: string) {
  const url = `steam://rungameid/730//+connect ${ip}`
  navigateTo(url, { external: true })
}
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="w-full mt-8 bg-gray-900 border border-gray-700 text-center text-gray-300"
    >
      <thead>
        <tr>
          <th class="py-1">{{ $t("servers.title.name") }}</th>
          <th class="py-1">{{ $t("servers.title.ip_address") }}</th>
          <th class="py-1">{{ $t("servers.title.owner") }}</th>
          <th class="py-1">{{ $t("servers.title.created_on") }}</th>
          <th class="py-1">{{ $t("servers.title.ping") }}</th>
        </tr>
      </thead>
      <tbody v-if="servers && servers.length > 0">
        <tr
          v-for="server in servers"
          :server="server"
          :key="server.id"
          class="border border-gray-700 text-gray-400 hover:bg-gray-800"
        >
          <td class="py-2 px-2 lg:px-0 italic whitespace-nowrap">
            {{ server.name }}
          </td>
          <td class="py-2 px-2 lg:px-0">
            <div class="inline-flex items-center gap-2">
              <p>
                {{ server.ip_address }}
              </p>
              <UButton
                variant="ghost"
                :ui="uiButton"
                @click="connect(server.ip_address)"
              >
                <IconConnect />
              </UButton>
            </div>
          </td>
          <td class="py-2 px-2 lg:px-0">
            <NuxtLink
              :to="`/profile/${server.owner.steam_id}`"
              class="py-2 px-2 lg:px-0 text-cyan-600 whitespace-nowrap hover:text-cyan-400"
            >
              {{ server.owner.name }}
            </NuxtLink>
          </td>
          <td class="py-2 px-2 lg:px-0 whitespace-nowrap">
            {{ toLocal(server.created_on) }}
          </td>

          <td class="py-2 px-2 lg:px-0 whitespace-nowrap">
            <span v-if="server.info">{{ server.info.ping }}</span>
            <IconNoConnection v-else class="inline" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="border border-gray-700 text-gray-500">
          <td colspan="8">No Data</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
