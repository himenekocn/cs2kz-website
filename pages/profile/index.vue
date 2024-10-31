<script setup lang="ts">
function onModeChange(index: number) {
  console.log(index)
}
</script>
<template>
  <Main>
    <div class="max-w-5xl mx-auto text-gray-300">
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

      <ProfileCompletion class="mb-6" />

      <ProfileHistory class="mb-6" />
    </div>
  </Main>
</template>
