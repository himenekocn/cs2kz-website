<script setup lang="ts">
import type { Server, ServerQuery } from '@/types'

const props = defineProps<{
  server: Server
  query: ServerQuery
}>()

const toast = useToast()

async function copyServerIp() {
  const serverIp = `${props.server.host}:${props.server.port}`
  await navigator.clipboard.writeText(serverIp)
  toast.add({
    title: 'Server IP copied to clipboard',
    color: 'success',
    progress: false,
    duration: 2000,
  })
}
</script>

<template>
  <div class="rounded-md ring-2 ring-gray-700">
    <TheImage
      class="w-80 h-45 rounded-tl-md rounded-tr-md cursor-pointer"
      :src="`https://github.com/kzglobalteam/cs2kz-images/raw/public/webp/medium/${server.a2s_info!.current_map}/1.webp`"
    ></TheImage>

    <div class="text-muted p-2">
      <div class="flex justify-between items-center">
        <UTooltip :text="server.name" :content="{ side: 'top' }">
          <p class="italic max-w-56 truncate">{{ server.name }}</p>
        </UTooltip>
        <div class="flex items-center">
          <UButton variant="ghost" square class="cursor-pointer" @click="copyServerIp">
            <IconCopy />
          </UButton>
          <UButton
            variant="ghost"
            square
            :to="`steam://rungameid/730//+connect ${server.host}:${server.port}`"
            target="_blank"
          >
            <IconConnect />
          </UButton>
        </div>
      </div>

      <div class="flex items-center justify-between gap-1">
        <RouterLink
          class="text-lg font-semibold text-slate-300 hover:text-slate-200"
          :to="`/maps/${server.a2s_info!.current_map}`"
          >{{ server.a2s_info!.current_map }}</RouterLink
        >
        <span>{{ server.a2s_info!.num_players }} / {{ server.a2s_info!.max_players }}</span>
      </div>

      <div class="flex items-center gap-1 mt-1">
        <IconAdmin />
        <RouterLink class="text-cyan-600 whitespace-nowrap hover:text-cyan-400" :to="`/profile/${server.owner.id}`">
          {{ server.owner.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
