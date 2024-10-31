<script setup lang="ts">
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  Colors,
  Tooltip,
} from "chart.js"

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Colors,
  Tooltip,
)

const datasets = [
  {
    label: "Count",
    data: [120, 342, 261, 188, 102, 95, 74, 32, 30, 21, 10],
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
]

onMounted(() => {
  const chartElement = document.getElementById(
    "points-chart",
  ) as HTMLCanvasElement
  new Chart(chartElement, {
    type: "bar",
    data: {
      labels: [
        "0-100",
        "100+",
        "200+",
        "300+",
        "400+",
        "500+",
        "600+",
        "700+",
        "800+",
        "900+",
        "WRs",
      ],
      datasets,
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
</script>

<template>
  <div class="w-full lg:w-4/5">
    <canvas id="points-chart" />
  </div>
</template>
