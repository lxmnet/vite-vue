<template>
  <div>
    <div ref="myRef" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import * as echarts from "echarts";
  export default {
    props: {
      option: Object
    },
    setup(props) {
      const myRef = ref(null)

      onMounted(() => {
        setTimeout(() => {
          drawChart()
        }, 20)
      })
      let Chart = null
      // 绘制折线图
      const drawChart = () => {
        // 初始化echarts实例
        Chart = echarts.init(myRef.value);
        // 父组件传来的实例参数
        Chart.setOption(props.option)
        window.addEventListener("resize", () => {
          //页面大小变化后Echarts也更改大小
          Chart.resize();
        })
      }

      const resetOption = () => {
        Chart.setOption(props.option)
      }
      return {
        myRef,
        drawChart,
        resetOption
      }
    }
  };
</script>
