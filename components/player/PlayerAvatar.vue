<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
  username: string
}>()

const fullUrl = computed(() => {
  return props.avatarUrl.replace(/(\.jpg)$/, "_full" + "$1")
})
</script>
<template>
  <UAvatar size="md" :src="fullUrl" :alt="username" />
</template>
