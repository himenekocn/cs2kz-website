<script setup lang="ts">
import type { Server } from "~/types"

const { t } = useI18n()

defineProps<{
  servers: Server[]
  loading: boolean
}>()

const { locale } = useI18n()

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
          th: { base: 'text-nowrap', size: 'text-base', padding: 'py-2' },
          td: { base: 'text-nowrap', size: 'text-base', padding: 'py-2' },
          tr: { base: 'hover:bg-gray-800 transition ease-in' },
        }"
        :loading="loading"
        :columns="columns"
        :rows="servers"
      >
        <template #name-data="{ row }">
          <span class="italic">{{ row.name }}</span>
        </template>

        <template #host-data="{ row }">
          <div class="inline-flex items-center gap-2">
            <span>{{ `${row.host}:${row.port}` }}</span>
            <UButton
              variant="ghost"
              :ui="{
                padding: { sm: 'p-1' },
                variant: { ghost: 'dark:hover:bg-green-400/40' },
              }"
              @click="connect(`${row.host}:${row.port}`)"
            >
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
          <UTooltip :text="toLocal(row.approved_at)">
            <span>{{ toLocalDistance(row.approved_at, locale) }}</span>
          </UTooltip>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
