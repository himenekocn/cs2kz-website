<script lang="ts" setup>
const open = defineModel<boolean>()

defineProps<{
  navigation: {
    localePath: string
    path: string
  }[]
}>()

const uiModal = {
  background: "bg-gray-900",
  transition: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 translate-x-full",
    enterTo: "opacity-100 translate-x-0",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 translate-x-0",
    leaveTo: "opacity-0 translate-x-full",
  },
}
const activeClassButton = "bg-primary bg-opacity-30"
</script>

<template>
  <UModal v-model="open" :ui="uiModal" fullscreen>
    <div class="container mx-auto px-2 flex flex-1 flex-col">
      <div
        class="h-12 flex justify-between items-center border-b border-gray-700"
      >
        <AppLogo />

        <IconClose @click="open = false" />
      </div>

      <nav class="mt-2">
        <ul class="flex flex-col gap-2">
          <li v-for="item in navigation" :key="item.path">
            <UButton
              variant="ghost"
              :to="item.path"
              :ui="{ size: { sm: 'text-lg' } }"
              :active-class="activeClassButton"
              @click="open = false"
            >
              {{ $t(item.localePath) }}
            </UButton>
          </li>
        </ul>
      </nav>
    </div>
  </UModal>
</template>

<style>
.container {
  font-family: "Akshar", sans-serif;
}
</style>
