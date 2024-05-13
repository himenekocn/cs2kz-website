<script setup lang="ts">
import type { ServerWithInfo } from "~/types/server"

defineProps<{
  servers: ServerWithInfo[] | null
  loading: boolean
}>()

const opened = ref<number[]>([])

const uiConnectButton = {
  padding: { sm: "p-1" },
  variant: { ghost: "dark:hover:bg-green-400/40" },
}

const uiInfoButton = {
  padding: { sm: "p-1" },
  variant: { ghost: "dark:hover:bg-gray-400/40" },
}

const pingColors = {
  good: "text-green-400",
  mid: "text-orange-400",
  bad: "text-red-400",
}

function connect(ip: string) {
  const url = `steam://rungameid/730//+connect ${ip}`
  navigateTo(url, { external: true })
}

function toggleOpen(id: number) {
  const index = opened.value.indexOf(id)
  if (index === -1) {
    opened.value.push(id)
  } else {
    opened.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="w-full mt-8 bg-gray-900 border border-gray-700 text-center text-gray-300"
    >
      <thead>
        <tr>
          <th class="w-4" />
          <th class="py-1">{{ $t("servers.title.name") }}</th>
          <th class="py-1">{{ $t("servers.title.ip_address") }}</th>
          <th class="py-1">{{ $t("servers.title.owner") }}</th>
          <th class="py-1">{{ $t("servers.title.created_on") }}</th>
          <th class="py-1">{{ $t("servers.title.ping") }}</th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr class="border border-gray-700 text-gray-400">
          <td colspan="8" class="py-4">
            <IconLoading class="inline" />
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="servers && servers.length > 0">
        <template v-for="server in servers" :key="server.id">
          <tr
            :server="server"
            class="border border-gray-700 text-gray-400 hover:bg-gray-800 transition ease-in"
          >
            <td class="py-2 px-2" @click="toggleOpen(server.id)">
              <UButton variant="ghost" :ui="uiInfoButton">
                <IconDown v-if="opened.includes(server.id)" />
                <IconRight v-else />
              </UButton>
            </td>
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
                  :ui="uiConnectButton"
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
              <span
                v-if="server.info"
                :class="pingColors[server.info.connection]"
                >{{ server.info.ping }}</span
              >
              <IconNoConnection v-else class="inline" />
            </td>
          </tr>
          <tr v-if="opened.includes(server.id)" class="transition-all ease-in">
            <ServerInfo :info="server.info" />
          </tr>
        </template>
      </tbody>
      <tbody v-else>
        <tr class="border border-gray-700">
          <td colspan="8" class="text-gray-500">
            {{ $t("common.no_data") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
