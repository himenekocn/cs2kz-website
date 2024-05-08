<script setup lang="ts">
const { servers, loading, error, query, total, getServers } = useServers()

getServers()
</script>
<template>
  <Main>
    <ServerQuery v-model:query="query" />

    <PageHelper
      :total="total"
      v-model:limit="query.limit"
      v-model:offset="query.offset"
      @refresh="getServers"
    />

    <ServerTable :loading="loading" :error="error" :servers="servers" />
  </Main>
</template>
