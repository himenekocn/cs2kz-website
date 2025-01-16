<script setup lang="ts">
import type { Server } from "~/types"

const { t } = useI18n()

defineProps<{
  servers: Server[]
  loading: boolean
}>()

const columns = computed(() => {
  return [
    { key: "name", label: t("servers.title.name") },
    { key: "host", label: t("servers.title.ipAddress") },
    { key: "owner", label: t("servers.title.owner") },
    { key: "approved_at", label: t("servers.title.approvedOn") },
  ]
})

function connect(ip: string) {
  const url = `steam://rungameid/730//+connect ${ip}`
  navigateTo(url, { external: true })
}
</script>

<template>
  <div class="mt-8">
    <UCard :ui="{ body: { padding: '' } }">
      <UTable
        :ui="{
          th: { size: 'text-base', padding: 'py-2' },
          td: { size: 'text-base', padding: 'py-2' },
          tr: { base: 'hover:bg-gray-800 transition ease-in' },
        }"
        :loading="loading"
        :columns="columns"
        :rows="servers">
        <template #name-data="{ row }">
          <p>{{ row.name }}</p>
        </template>

        <template #host-data="{ row }">
          <div class="inline-flex items-center gap-2">
            <p>{{ `${row.host}:${row.port}` }}</p>
            <UButton
              variant="ghost"
              :ui="{
                padding: { sm: 'p-1' },
                variant: { ghost: 'dark:hover:bg-green-400/40' },
              }"
              @click="connect(`${row.host}:${row.port}`)">
              <IconConnect />
            </UButton>
          </div>
        </template>

        <template #owner-data="{ row }">
          <NuxtLink :to="`/profile/${row.owner.id}`" class="text-cyan-600 whitespace-nowrap hover:text-cyan-400">
            {{ row.owner.name }}
          </NuxtLink>
        </template>

        <template #approved_at-data="{ row }">
          <p>{{ toLocal(row.approved_at) }}</p>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
