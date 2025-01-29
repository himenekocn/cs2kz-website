<script setup lang="ts">
const { servers, loading, error, query, total, getServers } = useServers()

getServers()
</script>
<template>
  <Main class="lg:w-2/3 mx-auto">
    <ServerQuery v-model:query="query" />

    <div v-if="total > 0" class="px-4 py-2 mt-8 border border-gray-700 rounded-md lg:mx-auto lg:w-max">
      <PageHelper v-model:limit="query.limit" v-model:offset="query.offset" :total="total" @refresh="getServers" />
    </div>

    <ServerTable :loading="loading" :error="error" :servers="servers" />
  </Main>
</template>
