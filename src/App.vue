<template>
  <el-upload action='' drag :auto-upload="false" :on-change="uploadChange" :limit="1">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
  <LineCharts ref="line" :option="option" />
</template>
<script setup>
import * as xlsx from "xlsx"
import * as echarts from 'echarts'
import { readFile, dealdate } from './utils/index'
import { reactive, ref } from 'vue'
import LineCharts from './components/LineCharts.vue'

const uploadChange = async (file) => {
  let dataBinary = await readFile(file.raw)
  let workBook = xlsx.read(dataBinary, { type: 'binary', cellDates: true })
  let workSheet = workBook.Sheets[workBook.SheetNames[0]]
  let data = xlsx.utils.sheet_to_json(workSheet)
  dataHandler(data)
}

function dataHandler(data) {
  data.map(item => {
    item.date = dealdate(item.date)
  })
  console.log(data)
  // const dateList = data.map(item => dealdate(item.date))
  // const priceList = data.map(item => item.start)
  // option.xAxis.data = dateList
  // option.series.data = priceList
  let money = 10000
  let count = 0
  let price = 0
  const priceList = []
  const dateList = []
  data.map((item, index) => {
    if (item.macd > 0 && index != 0 && data[index-1].macd < 0 ) {
      price = item.end
      count = money/item.end
    }
    if (item.macd <= 0 && index != 0 && data[index-1].macd > 0 && price > 0) {
      money = item.end*count
      price = 0
      count = 0
      priceList.push(money)
      dateList.push(item.date)
    }
  })
  option.xAxis.data = dateList
  option.series.data = priceList
  console.log(priceList)
  line.value.resetOption(data)
}
const line = ref(null)

const option = reactive({
  // 自定义图表的配置项和数据
    title: {
      text: '系统折线图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['价格']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2021-03-11', '2021-03-12', '2021-03-13', '2021-03-14', '2021-03-15', '2021-03-16', '2021-03-17', '2022-08-08']
      },
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: {
      name: '价格',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    }
    
})

</script>