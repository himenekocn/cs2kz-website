<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value
    .filter((i) => i.code !== locale.value)
    .map((locale) => [
      {
        label: locale.name,
        click: () => {
          setLocale(locale.code)
        },
      },
    ])
})

const navigation = [
  {
    localePath: "nav.recent",
    path: "/recent",
  },
  {
    localePath: "nav.maps",
    path: "/maps",
  },
  {
    localePath: "nav.profile",
    path: "/profile",
  },
  {
    localePath: "nav.servers",
    path: "servers",
  },
  {
    localePath: "nav.jumpstats",
    path: "/jumpstats",
  },
]

// replace style preset
const uiButton = {
  font: "font-semibold",
  color: {
    gray: { ghost: "text-gray-50 hover:bg-primary/40" },
  },
}
const activeClassButton = "bg-primary bg-opacity-30"
</script>
<template>
  <div class="h-16 border-b border-gray-800">
    <header
      class="h-full xl:max-w-7xl md:px-6 mx-auto grid grid-cols-3 items-center bg-gray-900/60"
    >
      <!-- logo -->
      <div class="flex items-center">
        <nuxt-link to="/">
          <app-logo />
        </nuxt-link>
      </div>

      <!-- navigation -->
      <nav class="hidden lg:flex justify-center">
        <ol class="text-[1.125rem] flex gap-4 leading-5">
          <li v-for="item in navigation" :key="item.path">
            <UButton
              size="md"
              variant="ghost"
              color="gray"
              :to="item.path"
              :ui="{
                size: { md: locale === 'en' ? 'text-base' : 'text-sm' },
                ...uiButton,
              }"
              :active-class="activeClassButton"
            >
              {{ $t(item.localePath) }}
            </UButton>
          </li>
        </ol>
      </nav>

      <div class="flex gap-2 justify-end items-center">
        <!-- switch locale -->
        <UDropdown :items="availableLocales">
          <IconLocales />
        </UDropdown>

        <!-- steam -->
        <UButton
          variant="ghost"
          :ui="{ variant: { ghost: 'hover:bg-primary/40' } }"
        >
          <IconSteam />
        </UButton>
      </div>
    </header>
  </div>
</template>
