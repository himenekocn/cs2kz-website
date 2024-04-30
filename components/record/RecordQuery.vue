<script setup lang="ts">
import type { Style } from "~/types/common"
import type { RecordQuery } from "~/types/record"

const query = defineModel<RecordQuery>("query", { required: true })

const modes = [{ label: "CKZ" }, { label: "VNL" }]

const types = [{ label: "Standard" }, { label: "Pro" }]

// TODO: style definitions
const styles = ["Normal", "Auto Bhop", "Low Gravity"]
const style = ref(styles[0])

// const isWr = ref(true)

const uiTabs = { wrapper: "relative space-y-0" }

// watch(isWr, (isWr) => {
//   query.value.points = isWr ? 1000 : undefined
// })

watch(style, (style) => {
  query.value.style = style
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("_") as Style
})

function onModeChange(index: number) {
  query.value.mode = index === 0 ? "classic" : "vanilla"
}

function onTypeChange(index: number) {
  query.value.teleports = index === 0 ? undefined : false
}
</script>

<template>
  <div
    class="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 border border-gray-700 rounded-md"
  >
    <UTabs
      :items="modes"
      :ui="{
        list: { width: 'w-48', tab: { size: 'text-lg', padding: 'px-0' } },
        ...uiTabs,
      }"
      :default-index="0"
      @change="onModeChange"
    />

    <div class="col-span-3 flex items-center flex-wrap justify-end gap-4">
      <!-- TODO: points param -->
      <!-- <UCheckbox v-model="isWr" label="WRs" /> -->

      <UTabs
        :items="types"
        :ui="uiTabs"
        :default-index="0"
        @change="onTypeChange"
      />

      <UInput v-model="query.course" placeholder="Course">
        <template #trailing>
          <IconMap />
        </template>
      </UInput>

      <UInput v-model="query.player" placeholder="Player">
        <template #trailing>
          <IconPlayer />
        </template>
      </UInput>

      <UInput v-model="query.server" placeholder="Server">
        <template #trailing>
          <IconServer />
        </template>
      </UInput>

      <USelect v-model="style" :options="styles" />

      <!-- TODO: date picker -->
    </div>
  </div>
</template>
