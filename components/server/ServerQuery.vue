<script setup lang="ts">
import type { ServerQuery } from "~/types/server"

const query = defineModel<ServerQuery>("query", { required: true })

const uiReset = {
  padding: { sm: "p-1" },
  variant: { outline: "dark:hover:bg-gray-700" },
}

function resetFilter() {
  query.value.name = ""
  query.value.ip_address = ""
  query.value.owned_by = ""
}
</script>

<template>
  <div
    class="lg:w-max mx-auto p-4 flex flex-wrap items-center justify-center gap-4 lg:gap-8 border border-gray-700 rounded-md"
  >
    <UInput v-model="query.name" :placeholder="$t('servers.query.name')">
      <template #trailing>
        <IconMap />
      </template>
    </UInput>
    <UInput
      v-model="query.ip_address"
      :placeholder="$t('servers.query.ip_address')"
    >
      <template #trailing>
        <IconPlayer />
      </template>
    </UInput>
    <UInput
      v-model="query.owned_by"
      :placeholder="$t('servers.query.owned_by')"
    >
      <template #trailing>
        <IconServer />
      </template>
    </UInput>

    <UButton variant="outline" color="gray" :ui="uiReset" @click="resetFilter">
      <IconReset />
    </UButton>
  </div>
</template>
