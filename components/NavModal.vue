<script lang="ts" setup>
const open = defineModel<boolean>()

defineProps<{
  navigation: {
    localePath: string
    path: string
  }[]
}>()
</script>

<template>
  <UModal
    v-model="open"
    :ui="{
      container: 'items-start',
      overlay: { background: 'bg-gray-800/75' },
    }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-800',
        background: 'bg-gray-900',
      }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <AppLogo />

          <IconClose @click="open = false" />
        </div>
      </template>
      <div class="container mx-auto px-2 flex flex-1 flex-col">
        <nav class="mt-2">
          <ul class="flex flex-col gap-2">
            <li v-for="item in navigation" :key="item.path">
              <UButton
                variant="ghost"
                :to="item.path"
                :ui="{
                  size: { sm: 'text-lg' },
                  variant: { ghost: 'hover:bg-primary/40' },
                }"
                active-class="bg-primary bg-opacity-30"
                @click="open = false"
              >
                {{ $t(item.localePath) }}
              </UButton>
            </li>
          </ul>
        </nav>
      </div>
      <template #footer>
        <ExternalLinks />
      </template>
    </UCard>
  </UModal>
</template>

<style>
.container {
  font-family: "Akshar", sans-serif;
}
</style>
