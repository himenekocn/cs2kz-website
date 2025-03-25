<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  avatarUrl: string
  username: string
}>()

const fullUrl = computed(() => {
  return props.avatarUrl.replace(/_medium/, '_full')
})
</script>
<template>
  <UAvatar size="xs" :src="fullUrl" :alt="username" />
</template>
