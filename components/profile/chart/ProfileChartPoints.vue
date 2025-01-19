<script setup lang="ts">
import { Chart, LinearScale, CategoryScale, BarElement, BarController, Colors, Tooltip } from "chart.js"

const props = defineProps<{
  pointsDist: number[]
}>()

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Colors, Tooltip)

const chart = ref<Chart | null>(null)

// const datasets: { label: string; data: number[]; backgroundColor: string[] }[] = [
//   {
//     label: "Count",
//     data: [],
//     backgroundColor: [
//       "#4CAF50",
//       "#8BC34A",
//       "#CDDC39",
//       "#FFEB3B",
//       "#FFC107",
//       "#FF9800",
//       "#FF5722",
//       "#F44336",
//       "#E91E63",
//       "#9C27B0",
//       "#673AB7",
//     ],
//   },
// ]

// watch(
//   () => props.pointsDist,
//   (dist) => {
//     if (chart.value) {
//       chart.value.data.datasets[0]!.data = dist
//       chart.value.update()
//     }
//   },
// )

onMounted(() => {
  const chartElement = document.getElementById("points-chart") as HTMLCanvasElement

  console.log("dist", props.pointsDist)

  chart.value = new Chart(chartElement, {
    type: "bar",
    data: {
      labels: ["0-1000", "1000+", "2000+", "3000+", "4000+", "5000+", "6000+", "7000+", "8000+", "9000+", "WRs"],
      datasets: [
        {
          label: "Count",
          data: props.pointsDist,
          backgroundColor: [
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
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
          ticks: {
            color: "#ababab",
          },
          grid: {
            display: false,
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
    <canvas id="points-chart" />
  </div>
</template>
