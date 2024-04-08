<template>
  <div ref="hostEl">
    <div class="bg-white px-2 space-y-2 py-2 rounded">
      <el-descriptions title="监测面板" direction="vertical" colum="2" size="small" border>
        <template #extra class="btnCharts">
          <el-button type="primary" @click="openCharts()">打开图表</el-button>
        </template>
        <el-descriptions-item label="地点">中国南海东北部</el-descriptions-item>
        <el-descriptions-item label="坐标">20°42'N，119°54'E</el-descriptions-item>
        <el-descriptions-item label="水深" :span="2">约3500米</el-descriptions-item>
        <el-descriptions-item label="文件数">4898个 </el-descriptions-item>
        <el-descriptions-item label="样本率">4000Hz </el-descriptions-item>
        <el-descriptions-item label="水听器频率响应范围">50Hz-2000Hz </el-descriptions-item>
        <el-descriptions-item label="灵敏度">-170 dB ref: 1V/uPa </el-descriptions-item>
        <el-descriptions-item label="前置放大器增益">4.5</el-descriptions-item>
        <el-descriptions-item label="水听器信号采集配置"
          >每3小时记录声音信号15分钟，每天生成8个文件
        </el-descriptions-item>
        <el-descriptions-item label="部署浮标装备">
          部署深度为300米的水听器，温度传感器，CTDs（电导率、温度、深度传感器），ADCP（声学多普勒流速剖面仪）
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-if="ifChartsOpen" class="chartsPopup">
      <Charts></Charts>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Overlay } from "ol"
import { fromLonLat } from "ol/proj"
import { onMounted, ref, watch, computed } from "vue"
import { useInjectContext } from "../../hooks"
import Charts from "../Charts/index.vue"
defineOptions({
  name: "AddressPopup"
})
let props = defineProps<{ feature: null | any }>()
//接收OlProvideContext对象中的mapInstance，为Reactive响应式对象
const { mapInstance } = useInjectContext()

//为map添加overlay
const popup = new Overlay({
  //   //不会点击到下面的地图背景图层，下面map.on函数中的feature变成undifined从而被取消弹窗
  //   autoPan: {
  //     animation: {
  //       duration: 250
  //     }
  //   }
})
mapInstance.addOverlay(popup)
//挂载时赋值
const hostEl = ref()
onMounted(() => {
  popup.setElement(hostEl.value)
})

//监控坐标信息feature，有变化则更新popup位置
watch(
  () => props.feature,
  //设置坐标
  (newItem) => {
    if (newItem) {
      popup.setPosition(fromLonLat([newItem.lon, newItem.lat]))
    } else {
      popup.setPosition(void 0)
    }
  }
)

var ifChartsOpen = ref(false)
const openCharts = () => {
  ifChartsOpen.value = true
}
</script>
<style lang="scss" scoped>
.el-descriptions {
  margin-top: 20px;
  .btnCharts {
    float: left;
  }
  .el-descriptions-item {
    display: flex;
    width: 50px;
  }
}
.chartsPopup {
  height: 300px;
  width: 600px;
  position: absolute;
  top: 10%;
  left: 10%;
  background-color: white;
}
</style>
