<script setup lang="ts"></script>

<template>
  <div class="flex items-center">
    <UTooltip :text="$t('nav.tooltip.discord')">
      <UButton variant="ghost" to="https://www.discord.gg/csgokz" target="_blank">
        <IconDiscord />
      </UButton>
    </UTooltip>

    <UTooltip :text="$t('nav.tooltip.github')">
      <UButton variant="ghost" to="https://github.com/KZGlobalTeam" target="_blank">
        <IconGithub />
      </UButton>
    </UTooltip>
  </div>
</template>
