<script setup lang="ts">
import { navigateTo } from "#app"
const config = useRuntimeConfig()
const { locale, locales, setLocale } = useI18n()
const player = usePlayer()

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
    ]) as { label: string; click: () => void }[][]
})

const openNavigation = ref(false)

const options = [
  [
    {
      label: "Sign Out",
      click: signout,
    },
  ],
]
const navigation = computed(() => {
  const routes = [
    {
      localePath: "nav.records",
      path: "/records",
    },
    {
      localePath: "nav.courses",
      path: "/courses",
    },
    {
      localePath: "nav.servers",
      path: "/servers",
    },
    {
      localePath: "nav.jumpstats",
      path: "/jumpstats",
    },
  ]

  if (player.value) {
    routes.splice(2, 0, {
      localePath: "nav.profile",
      path: `/profile/${player.value.steam_id}`,
    })
  }

  return routes
})

// replace style preset
const navButton = {
  font: "font-medium",
  color: { gray: { ghost: "dark:hover:bg-primary/40" } },
}
const activeNavButton = "bg-primary bg-opacity-30"
const uiIcon = { variant: { ghost: "hover:bg-primary/40" } }

watch(player, (val) => {
  if (val === null) {
    navigateTo("/")
  }
})

function signin() {
  const url = `${config.public.apiBase}/auth/login?redirect_to=${location.origin}`
  navigateTo(url, { external: true })
}

function signout() {
  player.value = null
  $fetch("/auth/logout", {
    baseURL: config.public.apiBase,
    credentials: "include",
  })
}
</script>
<template>
  <div class="h-12 border-b border-gray-700">
    <header
      class="h-full xl:max-w-7xl px-2 md:px-6 lg:mx-auto grid grid-cols-2 lg:grid-cols-3 items-center bg-gray-900"
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
              variant="ghost"
              color="gray"
              :to="item.path"
              :ui="navButton"
              :active-class="activeNavButton"
            >
              {{ $t(item.localePath) }}
            </UButton>
          </li>
        </ol>
      </nav>

      <div class="flex justify-end items-center">
        <ExternalLinks class="hidden lg:block" />

        <!-- switch locale -->
        <UButton variant="ghost" :ui="uiIcon">
          <UDropdown
            :items="availableLocales"
            :popper="{ placement: 'bottom-start' }"
          >
            <IconLocales />
          </UDropdown>
        </UButton>

        <!-- login -->
        <UButton v-if="player" variant="ghost" :ui="uiIcon">
          <UDropdown :items="options" :popper="{ placement: 'bottom-start' }">
            <PlayerAvatar
              :avatar-url="player.avatar_url"
              :username="player.username"
            />
          </UDropdown>
        </UButton>

        <UButton v-else variant="ghost" :ui="uiIcon" @click="signin">
          <IconSteam />
        </UButton>

        <UButton
          square
          variant="ghost"
          :ui="uiIcon"
          class="lg:hidden"
          @click="openNavigation = true"
        >
          <IconBars />
        </UButton>
      </div>
    </header>
    <NavModal v-model="openNavigation" :navigation="navigation" />
  </div>
</template>
