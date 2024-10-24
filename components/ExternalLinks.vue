<script setup lang="ts">
const uiIcon = { variant: { ghost: "hover:bg-primary/40" } }
</script>

<template>
  <div class="flex items-center">
    <UButton
      variant="ghost"
      :ui="uiIcon"
      @click="
        navigateTo('https://github.com/KZGlobalTeam', {
          external: true,
          open: { target: '_blank' },
        })
      "
    >
      <IconGithub />
    </UButton>
    <UButton
      variant="ghost"
      :ui="uiIcon"
      @click="
        navigateTo('https://www.discord.gg/csgokz', {
          external: true,
          open: { target: '_blank' },
        })
      "
    >
      <IconDiscord />
    </UButton>
  </div>
</template>
