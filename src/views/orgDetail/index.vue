<template>
  <div class="box">
    <div class="chart">
      <radar-chart
        v-if="radarData.length > 0"
        :id="'orgDetailChart'"
        ref="radarDetailCharts"
        style="margin-top: 30px;"
        :color="'#02BC77'"
        :rgba="'rgba(2, 188, 119, 0.5)'"
        :data="radarData"
      />
    </div>
  </div>
</template>

<script>
import RadarChart from '../../components/echart/radar'
export default {
  components: { 'radar-chart': RadarChart },
  data() {
    return {
      radarData: []
    }
  },
  created() {
    if (this.$route.query.name) {
      document.title = this.$route.query.name
    }
    if (this.$route.query.id) {
      this.$store
        .dispatch('fetchIndexOrgInfo', this.$route.query.id)
        .then(rsp => {
          this.radarData = []
          rsp.datas.forEach(item => {
            this.radarData.push(item.evalValue)
          })
          this.$refs.radarDetailCharts.renderChart()
        })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100vh;
  background-color: #1b203f;
  .chart {
    padding-left: 15px;
  }
}
</style>
