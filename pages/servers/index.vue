<script setup lang="ts">
const { query, servers, loading, error, total, getServers } = useServers()

getServers()
</script>
<template>
  <Main>
    <ServerQuery :query="query" />

    <PageHelper :query="query" :total="total" />

    <ServerTable :loading="loading" :error="error" :servers="servers" />
  </Main>
</template>
