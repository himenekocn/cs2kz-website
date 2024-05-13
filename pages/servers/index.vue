<script setup lang="ts">
const { servers, loading, error, query, total, getServers } = useServers()

getServers()
</script>
<template>
  <Main>
    <ServerQuery v-model:query="query" />

    <PageHelper
      v-model:limit="query.limit"
      v-model:offset="query.offset"
      :total="total"
      @refresh="getServers"
    />

    <ServerTable :loading="loading" :error="error" :servers="servers" />
  </Main>
</template>
