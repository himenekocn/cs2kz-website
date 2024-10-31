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
    label: "Finished",
    data: [60, 176, 43, 101, 66, 43, 21, 5],
    backgroundColor: "#bfbfbf",
  },
  {
    label: "Total",
    data: [120, 342, 261, 188, 102, 95, 74, 32],
    backgroundColor: "rgb(171, 171, 171, 0.7)",
  },
  {
    label: "Average Points",
    data: [433, 176, 43, 101, 66, 43, 21, 5],
    hidden: true,
  },
]

onMounted(() => {
  const chartElement = document.getElementById(
    "maps-chart",
  ) as HTMLCanvasElement
  new Chart(chartElement, {
    type: "bar",
    data: {
      labels: [
        "Very Easy",
        "Easy",
        "Medium",
        "Advanced",
        "Hard",
        "Very Hard",
        "Extreme",
        "Death",
      ],
      datasets,
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
            color: [
              "#4CAF50",
              "#8BC34A",
              "#FFEB3B",
              "#FF9800",
              "#FF5722",
              "#F44336",
              "#9C27B0",
              "#673AB7",
            ],
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
              return datasets.map(
                (dataset) =>
                  `${dataset.label}: ${dataset.data[context.dataIndex]}`,
              )
            },
          },
        },
      },
    },
  })
})
</script>

<template>
  <div class="w-full lg:w-4/5">
    <canvas id="maps-chart" />
  </div>
</template>
