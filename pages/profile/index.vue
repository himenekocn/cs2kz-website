<script setup lang="ts">
function onModeChange(index: number) {
  console.log(index)
}
</script>
<template>
  <Main>
    <div class="max-w-4xl mx-auto">
      <UTabs
        class="mb-6"
        :items="[
          { label: $t('common.mode.ckz') },
          { label: $t('common.mode.vnl') },
        ]"
        :ui="{
          list: { width: 'w-48', tab: { size: 'text-xl', padding: 'px-0' } },
          wrapper: 'relative space-y-0',
        }"
        :default-index="0"
        @change="onModeChange"
      />

      <ProfileCard class="mb-6" />

      <ProfileCompletion />
    </div>
  </Main>
</template>
