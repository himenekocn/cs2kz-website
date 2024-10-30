<script setup lang="ts"></script>

<template>
  <div class="p-4 border border-gray-700 rounded-md text-gray-300 lg:text-lg">
    <div class="flex gap-2 lg:gap-4 pb-4 mb-4 border-b border-gray-800">
      <img
        src="/img/avatar.jpg"
        class="w-24 h-24 lg:w-32 lg:h-32 rounded-md ring-2 ring-blue-400/30"
      >

      <div class="flex flex-col gap-1 lg:gap-4">
        <p
          class="text-2xl font-semibold max-w-56 lg:w-full truncate text-cyan-600"
        >
          smieszneznaczki
        </p>

        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <img src="/img/finland.png" class="w-6 h-auto" >
            <p>Finland</p>
          </div>

          <UButton square variant="ghost">
            <IconSteam class="w-5 h-5" />
          </UButton>
        </div>

        <p>
          <span class="font-semibold mr-1">2446</span>
          <span class="text-gray-400">hrs on record</span>
        </p>
      </div>
    </div>

    <div class="flex flex-wrap gap-x-8 gap-y-0 lg:gap-y-8">
      <div>
        <span class="mr-1 text-gray-400">World Rank:</span>
        <span class="font-medium">#1,789</span>
      </div>

      <div>
        <span class="mr-1 text-gray-400">Rating:</span>
        <span class="font-medium">9.88</span>
      </div>

      <div>
        <span class="mr-1 text-gray-400">Points:</span>
        <span class="font-medium">43,771</span>
      </div>

      <div>
        <span class="mr-1 text-gray-400">Maps Finished:</span>
        <span class="font-medium">252</span>
      </div>
    </div>
  </div>
</template>
