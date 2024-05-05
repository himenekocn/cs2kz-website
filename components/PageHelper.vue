<script setup lang="ts">
import type { RecordQuery } from "~/types/record"

const props = defineProps<{
  total: number
}>()

const query = defineModel<{ limit: number; offset: number }>("query", {
  required: true,
})

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.total / query.value.limit))
const start = computed(() => (currentPage.value - 1) * query.value.limit)
const end = computed(() => {
  const max = currentPage.value * query.value.limit
  if (max > props.total) {
    return props.total
  }
  if (currentPage.value === totalPages.value) {
    return props.total
  }

  return max
})

const uiButton = {
  padding: { sm: "px-2 py-1" },
  variant: { ghost: "dark:hover:bg-gray-600/40" },
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    query.value.offset -= query.value.limit
  }
}

function nextPage() {
  currentPage.value++
  query.value.offset += query.value.limit
}

function firstPage() {
  currentPage.value = 1
  query.value.offset = 0
}

function lastPage() {
  currentPage.value = totalPages.value
  query.value.offset = (totalPages.value - 1) * query.value.limit
}
</script>

<template>
  <div
    class="lg:w-max lg:mx-auto mt-8 flex items-center justify-center flex-wrap gap-4 px-4 py-2 border border-gray-700 rounded-md text-gray-300"
  >
    <div class="flex items-center gap-2">
      <UButton variant="solid" color="gray" @click="firstPage"> 1 </UButton>
      <UButton
        :disabled="currentPage === 1"
        variant="ghost"
        :ui="uiButton"
        @click="prevPage"
      >
        <IconLeftRounded />
      </UButton>
      <p>
        {{ `${start} - ${end} of ${total} ` }}
      </p>
      <UButton
        :disabled="currentPage === totalPages"
        variant="ghost"
        :ui="uiButton"
        @click="nextPage"
      >
        <IconRightRounded />
      </UButton>
      <UButton variant="solid" color="gray" @click="lastPage">
        {{ totalPages }}
      </UButton>
    </div>

    <div class="hidden lg:flex items-center pl-4 border-l border-gray-700">
      <USelectMenu v-model="query.limit" :options="[10, 20, 30, 50, 100]" />
      <span class="pl-2">{{ `/ ${$t("pagination.page")}` }}</span>
    </div>
  </div>
</template>
