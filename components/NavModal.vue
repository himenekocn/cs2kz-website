<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
const open = defineModel<boolean>()

defineProps<{
  navigation: {
    localePath: string
    path: string
  }[]
}>()

defineEmits<{
  "update:open": [boolean]
}>()

const uiButton = {
  font: "font-semibold",
  color: { gray: { ghost: "text-gray-50" } },
}
const activeClassButton = "bg-primary bg-opacity-30"
</script>

<template>
  <TransitionRoot :show="open" as="template" appear>
    <Dialog>
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogPanel
          class="z-20 fixed inset-0 flex flex-col justify-between bg-gray-900 text-gray-50"
        >
          <div class="container mx-auto px-4 flex flex-1 flex-col">
            <div
              class="h-16 flex justify-between items-center border-b border-transparent"
            >
              <DialogTitle>
                <AppLogo />
              </DialogTitle>

              <UButton
                :ui="{ ...uiButton }"
                square
                size="md"
                variant="ghost"
                color="gray"
                @click="open = false"
              >
                <IconClose />
              </UButton>
            </div>

            <nav class="mt-5">
              <ul class="flex flex-col gap-2 text-2xl font-semibold">
                <li v-for="item in navigation" :key="item.path">
                  <UButton
                    size="xl"
                    color="gray"
                    variant="ghost"
                    :to="item.path"
                    :ui="{ ...uiButton }"
                    :active-class="activeClassButton"
                    @click="open = false"
                  >
                    {{ $t(item.localePath) }}
                  </UButton>
                </li>
              </ul>
            </nav>
          </div>

          <div class="mt-12 w-full h-2 bg-primary-500" />
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
