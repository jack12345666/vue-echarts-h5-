<template>
  <echart :id="id" :options="options" height="375px" width="710px" />
</template>

<script>
import Echart from '@/common/echart'
import { mapState } from 'vuex'
export default {
  components: { Echart },
  props: {
    id: {
      type: String,
      default: 'barChart'
    },
    legendList: {
      type: Array,
      default: function() {
        return []
      }
    },
    barData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      options: {},
      dataname: []
    }
  },
  computed: {
    ...mapState(['calcIndicators'])
  },
  created() {
    if (this.calcIndicators.length > 0) {
      this.calcIndicators.forEach(item => {
        this.dataname.push(item.name)
      })
    }
    this.renderBarChart()
  },
  methods: {
    renderBarChart() {
      this.options = {
        backgroundColor: '#2C325C',
        color: ['#FFD950', '#02BC77', '#4791FF'],
        grid: [
          {
            z: 1
          },
          {
            z: 2
          }
        ],
        legend: {
          data: this.legendList,
          left: 10,
          top: 0,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10
        },
        xAxis: [
          {
            type: 'category',
            data: this.dataname,
            axisLabel: {
              show: true,
              color: '#fff',
              fontSize: 12,
              marginBottom: 10,
              formatter: function(value) {
                if (
                  value === '亩均税收[万元/亩]' ||
                  value === '全员劳动生产率[万元/人]'
                ) {
                  return (
                    value.substr(0, 5) +
                    '\n' +
                    value.substr(5, 5) +
                    '\n' +
                    value.substr(10, 4)
                  )
                }
                if (value === '亩均增加值[万元/亩]') {
                  return value.substr(0, 5) + '\n' + value.substr(5, 6)
                }
                if (value === '单位排放权增加值[万元/吨]') {
                  return (
                    value.substr(0, 5) +
                    '\n' +
                    value.substr(5, 5) +
                    '\n' +
                    value.substr(10, 5)
                  )
                }
                if (value === '单位能耗增加值[万元/吨标煤]') {
                  return (
                    value.substr(0, 5) +
                    '\n' +
                    value.substr(5, 5) +
                    '\n' +
                    value.substr(10, 5)
                  )
                }
                if (value === 'R&D研发经费支出占主营业务收入比重[百分比]') {
                  return (
                    value.substr(0, 6) +
                    '\n' +
                    value.substr(6, 6) +
                    '\n' +
                    value.substr(12, 6) +
                    '\n' +
                    value.substr(18, 6)
                  )
                }
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'category',
            data: this.dataname,
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              color: '#fff'
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            // max: 100, // 需要对应网格一柱图的最大值，比例才能相等
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: this.legendList[0],
            type: 'bar',
            stack: 'A',
            barWidth: 10,
            xAxisIndex: 0,
            yAxisIndex: 0,
            silent: true,
            itemStyle: {
              barBorderRadius: 10
            },
            data: this.barData[0]
          },
          {
            name: this.legendList[1],
            type: 'bar',
            stack: 'A',
            barWidth: 10,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              barBorderRadius: 10
            },
            silent: true,
            data: this.barData[1]
          },
          {
            name: this.legendList[2],
            type: 'bar',
            stack: 'A',
            barWidth: 10,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              barBorderRadius: 10
            },
            silent: true,
            data: this.barData[2]
          }
        ]
      }
    }
  }
}
</script>

<style></style>
