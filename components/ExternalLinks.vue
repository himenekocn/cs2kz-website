<script setup lang="ts"></script>

<template>
  <div class="flex items-center">
    <UTooltip :text="$t('nav.tooltip.discord')">
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
    </UTooltip>

    <UTooltip :text="$t('nav.tooltip.github')">
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
    </UTooltip>
  </div>
</template>
