<script setup lang="ts">
const { query, servers, total, getServers } = useServers()

getServers()
</script>
<template>
  <Main>
    <ServerQuery :query="query" />

    <PageHelper :query="query" :total="total" />

    <ServerTable :servers="servers" />
  </Main>
</template>
