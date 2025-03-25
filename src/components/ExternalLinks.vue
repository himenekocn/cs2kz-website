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

    <UTooltip :text="$t('nav.tooltip.docs')">
      <UButton variant="ghost" to="https://docs.cs2kz.org" target="_blank">
        <IconBook />
      </UButton>
    </UTooltip>

    <UTooltip :text="$t('nav.tooltip.dashboard')">
      <UButton variant="ghost" to="https://dashboard.cs2kz.org" target="_blank">
        <IconDashboard />
      </UButton>
    </UTooltip>
  </div>
</template>
