<script setup lang="ts">
import { useImage } from "@vueuse/core"

const props = defineProps<{
  src: string
}>()

const { isLoading, error } = useImage({ src: props.src })
</script>

<template>
  <img v-if="!isLoading && !error" :src="props.src" loading="lazy" />

  <img v-else src="~/assets/img/fallback.jpg" loading="lazy" class="map-img" />
</template>

<style scoped>
@keyframes img-enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.map-img {
  animation: img-enter 0.25s ease;
  animation-fill-mode: forwards;
  opacity: 0;
}
</style>
