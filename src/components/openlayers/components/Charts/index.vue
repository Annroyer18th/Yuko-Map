<template>
  <div style="height: 300px; width: 600px" id="main"></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts"

import { onMounted, onUpdated } from "vue"
type EChartsOption = echarts.EChartsOption

onMounted(() => {
  init()
})
// onUpdated(() => {
//   init()
// })
function init() {
  var chartDom = document.getElementById("main")!
  var myChart = echarts.init(chartDom)
  var option: EChartsOption
  window.addEventListener("resize", function () {
    myChart.resize()
  })
  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [100, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true
      }
    ]
  }
  option && myChart.setOption(option)
}
</script>
