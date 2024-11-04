<script setup lang="ts"></script>

<template>
  <div class="flex items-center">
    <UButton
      variant="ghost"
      color="gray"
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
      color="gray"
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
