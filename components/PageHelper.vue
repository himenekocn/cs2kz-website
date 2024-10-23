<script setup lang="ts">
const props = defineProps<{
  total: number
}>()

const limit = defineModel<number>("limit", { required: true })
const offset = defineModel<number>("offset", { required: true })

defineEmits(["refresh"])

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.total / limit.value))
const start = computed(() => (currentPage.value - 1) * limit.value)
const end = computed(() => {
  const max = currentPage.value * limit.value
  if (max > props.total) {
    return props.total
  }
  if (currentPage.value === totalPages.value) {
    return props.total
  }

  return max
})

const lmt = ref("30")

const uiButton = {
  padding: { sm: "px-2 py-1" },
  variant: { ghost: "dark:hover:bg-gray-600/40" },
}

watch(lmt, (lmt) => {
  limit.value = Number(lmt)
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    offset.value -= limit.value
  }
}

function nextPage() {
  currentPage.value++
  offset.value += limit.value
}

function firstPage() {
  currentPage.value = 1
  offset.value = 0
}

function lastPage() {
  currentPage.value = totalPages.value
  offset.value = (totalPages.value - 1) * limit.value
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
      <USelectMenu v-model="lmt" :options="['10', '20', '30', '50', '100']" />
      <span class="pl-2">{{ `/ ${$t("pagination.page")}` }}</span>
    </div>

    <div class="hidden lg:block pl-4 border-l border-gray-700">
      <UButton variant="solid" color="gray" @click="$emit('refresh')">
        {{ $t("pagination.refresh") }}
      </UButton>
    </div>
  </div>
</template>
