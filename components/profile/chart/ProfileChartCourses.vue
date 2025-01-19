<script setup lang="ts">
import { Chart, LinearScale, CategoryScale, BarElement, BarController, Colors, Tooltip } from "chart.js"

const props = defineProps<{
  completedCourses: number[]
  totalCourses: number[]
}>()

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Colors, Tooltip)

const chart = ref<Chart | null>(null)

// const datasets: { label: string; data: number[]; backgroundColor?: string; hidden?: boolean }[] = [
//   {
//     label: "Completed",
//     data: [0, 0, 0, 0, 0, 0, 0, 0],
//     backgroundColor: "#bfbfbf",
//   },
//   {
//     label: "Total",
//     data: [0, 0, 0, 0, 0, 0, 0, 0],
//     backgroundColor: "rgb(171, 171, 171, 0.3)",
//   },
// ]

// watch(
//   () => [props.completedCourses, props.totalCourses],
//   ([completed, total]) => {
//     if (chart.value) {
//       chart.value.data.datasets[0]!.data = completed as number[]
//       chart.value.data.datasets[1]!.data = total as number[]
//       chart.value.update()
//     }
//   },
// )

onMounted(() => {
  const chartElement = document.getElementById("maps-chart") as HTMLCanvasElement

  chart.value = new Chart(chartElement, {
    type: "bar",
    data: {
      labels: ["Very Easy", "Easy", "Medium", "Advanced", "Hard", "Very Hard", "Extreme", "Death"],
      datasets: [
        {
          label: "Completed",
          data: props.completedCourses,
          backgroundColor: "#bfbfbf",
        },
        {
          label: "Total",
          data: props.totalCourses,
          backgroundColor: "rgb(171, 171, 171, 0.3)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          stacked: false,
          beginAtZero: true,
          ticks: {
            color: "#ababab",
          },
          grid: {
            color: "rgb(69, 69, 69, 0.5)",
          },
          border: {
            color: "rgb(69, 69, 69, 0.5)",
          },
        },
        x: {
          stacked: true,
          ticks: {
            color: ["#4CAF50", "#8BC34A", "#FFEB3B", "#FF9800", "#FF5722", "#F44336", "#9C27B0", "#673AB7"],
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        tooltip: {
          displayColors: false,
          callbacks: {
            label: (context) => {
              return datasets.map((dataset) => `${dataset.label}: ${dataset.data[context.dataIndex]}`)
            },
          },
        },
      },
    },
  })
})

onUnmounted(() => {
  chart.value?.destroy()
})
</script>

<template>
  <div class="w-full lg:w-4/5">
    <canvas id="maps-chart" />
  </div>
</template>
