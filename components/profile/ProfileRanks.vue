<script setup lang="ts">
defineProps<{
  wrs: number
  top20: number
  top50: number
  top100: number
}>()
</script>

<template>
  <div class="flex flex-wrap mb-4 gap-x-8 gap-y-0 lg:gap-y-8">
    <div class="flex">
      <span class="mr-1 text-gray-400">{{ $t("profile.completion.wrs") }}:</span>
      <span class="font-semibold text-yellow-400">{{ wrs }}</span>
      <IconMedalFirst class="w-5 h-5" />
    </div>

    <div>
      <span class="mr-1 text-gray-400">{{ $t("profile.completion.top20") }}:</span>
      <span class="font-medium text-red-400">{{ top20 }}</span>
    </div>

    <div>
      <span class="mr-1 text-gray-400">{{ $t("profile.completion.top50") }}:</span>
      <span class="font-medium text-purple-400">{{ top50 }}</span>
    </div>

    <div>
      <span class="mr-1 text-gray-400">{{ $t("profile.completion.top100") }}:</span>
      <span class="font-medium text-orange-400">{{ top100 }}</span>
    </div>
  </div>
</template>
