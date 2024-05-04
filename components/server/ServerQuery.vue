<script setup lang="ts">
import type { ServerQuery } from "~/types/server"

const query = defineModel<ServerQuery>("query", { required: true })
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
  </div>
</template>
