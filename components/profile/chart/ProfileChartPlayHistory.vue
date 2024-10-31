<script setup lang="ts">
import { format } from "date-fns"

import {
  Chart,
  LinearScale,
  CategoryScale,
  LineElement,
  LineController,
  Colors,
  Tooltip,
  PointElement,
  Filler,
} from "chart.js"

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  Filler,
  Colors,
  Tooltip,
)

const props = defineProps<{
  history: {
    time: number[]
    runs: number[]
    maps: number[]
  }
}>()

const chart = ref<Chart | null>(null)

watch(props.history, (history) => {
  if (chart.value === null) return

  chart.value.data.labels = getDateLabels(history.time.length)

  chart.value.data.datasets[0]!.data = history.time
  chart.value.data.datasets[1]!.data = history.runs
  chart.value.data.datasets[2]!.data = history.maps

  chart.value.update()
})

onMounted(() => {
  const chartElement = document.getElementById(
    "history-chart",
  ) as HTMLCanvasElement
  chart.value = new Chart(chartElement, {
    type: "line",
    data: {
      labels: getDateLabels(props.history.time.length),
      datasets: [
        {
          label: "Play Time",
          data: props.history.time,
          backgroundColor: "rgb(66, 135, 245, 0.7)",
          borderColor: "rgb(66, 135, 245)",
          borderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 4,
          lineTension: 0.2,
          fill: true,
        },
        {
          label: "Runs",
          data: props.history.runs,
          hidden: true,
        },
        {
          label: "Maps Finished",
          data: props.history.maps,
          hidden: true,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
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

function getDateLabels(range: number) {
  return Array.from({ length: range }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return format(date, "MM/dd")
  }).reverse()
}
</script>

<template>
  <div class="w-full">
    <canvas id="history-chart" />
  </div>
</template>
