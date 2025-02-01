<script setup lang="ts">
import { Chart, LinearScale, CategoryScale, BarElement, BarController, Colors, Tooltip } from "chart.js"

const props = defineProps<{
  pointsDist: number[]
}>()

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Colors, Tooltip)

let chart: Chart | null = null

watch(
  () => props.pointsDist,
  (dist) => {
    if (chart === null) {
      const chartElement = document.getElementById("points-chart") as HTMLCanvasElement

      chart = new Chart(chartElement, {
        type: "bar",
        data: {
          labels: ["0-1000", "1000+", "2000+", "3000+", "4000+", "5000+", "6000+", "7000+", "8000+", "9000+", "WRs"],
          datasets: [
            {
              label: "Count",
              data: dist,
              backgroundColor: [
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#bfbfbf",
                "#f5da42",
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
    } else {
      chart.data.datasets[0]!.data = dist
      chart.update()
    }
  },
)

onUnmounted(() => {
  chart?.destroy()
})
</script>

<template>
  <div class="w-full lg:w-4/5">
    <canvas id="points-chart" />
  </div>
</template>
