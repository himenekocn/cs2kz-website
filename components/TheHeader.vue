<script setup lang="ts">
const navigation = [
  {
    title: "Recent",
    path: "/recent",
  },
  {
    title: "Maps",
    path: "/maps",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Servers",
    path: "servers",
  },
  {
    title: "JumpStats",
    path: "/jumpstats",
  },
]

// replace style preset
const uiButton = {
  font: "font-semibold",
  color: {
    gray: { ghost: "text-gray-50 hover:text-gray-50 hover:bg-primary/40" },
  },
}
const activeClassButton = "bg-primary bg-opacity-30"
</script>
<template>
  <div class="h-16 border-b border-gray-800">
    <header
      class="h-full xl:max-w-7xl md:px-6 mx-auto grid grid-cols-3 items-center bg-gray-900/60 backdrop-blur-sm"
    >
      <!-- logo -->
      <div class="flex items-center">
        <nuxt-link>
          <app-logo />
        </nuxt-link>
      </div>

      <!-- nav -->
      <nav class="hidden lg:flex justify-center">
        <ol class="text-[1.125rem] flex gap-4 leading-5">
          <li v-for="item in navigation" :key="item.title">
            <UButton
              size="md"
              variant="ghost"
              color="gray"
              :to="item.path"
              :ui="{ size: { md: 'text-base' }, ...uiButton }"
              :active-class="activeClassButton"
            >
              {{ item.title }}
            </UButton>
          </li>
        </ol>
      </nav>
    </header>
  </div>
</template>
