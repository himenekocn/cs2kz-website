<script setup lang="ts">
import { ref, onMounted } from "vue"

const emits = defineEmits(["infinite"])

const scroller = ref<Element | null>(null)
const endOfScroller = ref<Element | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]

      if (entry?.isIntersecting) {
        emits("infinite")
      }
    },
    { rootMargin: "150px" },
  )

  observer.observe(endOfScroller.value as Element)
})
</script>

<template>
  <div ref="scroller" class="scroller">
    <slot></slot>
    <div ref="endOfScroller"></div>
  </div>
</template>
