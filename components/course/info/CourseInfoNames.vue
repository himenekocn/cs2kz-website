<script setup lang="ts">
defineProps<{
  names: string[]
  activeCourseIndex: number
}>()

const emit = defineEmits(["courseChange"])
</script>

<template>
  <div class="p-2 flex items-center gap-6 border-b border-gray-700 text-xl">
    <div
      v-for="(name, index) in names"
      :key="name"
      class="coursename"
      :class="activeCourseIndex === index ? 'active' : ''"
      @click="emit('courseChange', index)"
    >
      {{ name }}
    </div>
  </div>
</template>

<style scoped>
.coursename {
  position: relative;
  color: rgb(229 231 235);
}

.coursename:hover {
  cursor: pointer;
}

.coursename.active {
  color: rgb(96 165 250);
}

.coursename::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: rgb(96 165 250);
  bottom: 0;
  left: 50%;
  transition:
    ease-in width 0.2s,
    ease-in left 0.2s;
}

.coursename.active::after {
  width: 100%;
  left: 0;
}
</style>
