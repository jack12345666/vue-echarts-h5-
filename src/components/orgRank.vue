<template>
  <div class="box">
    <div class="header">
      <div class="title">
        公司排名
      </div>
      <div class="select">
        <van-dropdown-menu active-color="#666">
          <van-dropdown-item
            v-model="selectIndex"
            :options="selectList"
            @change="changeIndex"
          />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in orgRankIndicatorVals.slice(0, 5)"
        :key="index"
        class="item"
        @click="checkOrg(item.evalOrg, item.orgName)"
      >
        <div v-if="index < 3" :class="`rank${index + 1}`">
          {{ index + 1 }}
        </div>
        <div v-else class="rank">
          {{ index + 1 }}
        </div>
        <div class="orgName">
          {{ item.orgName }}
        </div>
        <div class="data">
          {{ item.evalValue }}
        </div>
      </div>
    </div>
    <div class="more">
      <span @click="toSearch">查看更多</span>
    </div>
    <div class="line"></div>
    <div class="title">
      {{ orgName }}
    </div>
    <radar-chart
      :id="'orgRankChart'"
      ref="radarCharts"
      style="margin: 10px 0 0 10px;"
      :color="'#02BC77'"
      :rgba="'rgba(2, 188, 119, 0.5)'"
      :data="radarData"
    />
  </div>
</template>

<script>
import RadarChart from '../components/echart/radar'
import { mapState } from 'vuex'
export default {
  components: { 'radar-chart': RadarChart },
  data() {
    return {
      selected: null,
      selectList: [],
      orgRankList: [],
      radarData: [],
      orgName: ''
    }
  },
  computed: {
    ...mapState([
      'calcIndicators',
      'orgRankIndicatorVals',
      'orgIndicatorVals',
      'selectIndex'
    ])
  },
  created() {
    if (this.calcIndicators.length > 0) {
      if (!this.selectIndex) {
        this.$store.commit('changeSelectIndex', this.calcIndicators[0].id)
      }
      this.calcIndicators.forEach(item => {
        this.selectList.push({
          text: item.name,
          value: item.id
        })
      })
    }
    if (this.orgIndicatorVals.length > 0) {
      this.orgName = this.orgRankIndicatorVals[0].orgName
      this.orgIndicatorVals.forEach(item => {
        this.radarData.push(item.evalValue)
      })
    }
  },
  methods: {
    changeIndex(value) {
      this.$store.commit('changeSelectIndex', value)
      this.$store
        .dispatch('fetchIndexOrgRank', { indicator: this.selectIndex })
        .then(rsp => {
          if (rsp && rsp.code === '0') {
            this.$store.commit('changeIndexOrgRank', rsp.datas)
            this.orgName = this.orgRankIndicatorVals[0].orgName
            this.$store
              .dispatch('fetchIndexOrgInfo', rsp.datas[0].evalOrg)
              .then(rsp => {
                if (rsp.code === '0') {
                  this.radarData = []
                  rsp.datas.forEach(item => {
                    this.radarData.push(item.evalValue)
                  })
                  this.$refs.radarCharts.renderChart()
                }
              })
          }
        })
    },
    checkOrg(id, name) {
      this.$store.dispatch('fetchIndexOrgInfo', id).then(rsp => {
        this.orgName = name
        this.radarData = []
        rsp.datas.forEach(item => {
          this.radarData.push(item.evalValue)
        })
        this.$refs.radarCharts.renderChart()
      })
    },
    toSearch() {
      this.$router.push('/search')
    }
  }
}
</script>
<style>
.van-dropdown-menu__bar {
  height: 32px;
  border: 1px solid #1b203f;
  background-color: #2c325c;
  border-radius: 10px;
  padding-right: 10px;
  max-width: 174px;
}
.van-dropdown-menu__title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
}
.van-dropdown-menu__title::after {
  color: #fff;
}
.van-popup {
  background-color: #2c325c;
  color: #fff;
}
.van-dropdown-item__content {
  background-color: #2c325c;
  margin-left: 29px;
  width: 317px;
}
.van-popup--top {
  background-color: #2c325c;
}
.van-dropdown-item__option {
  font-size: 12px;
  padding: 5px 8px;
  background-color: #2c325c;
  color: #fff;
}
.van-cell::after {
  border: none;
}
</style>
<style lang="less" scoped>
.box {
  background-color: #2c325c;
  margin: 0 29px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-bottom: 15px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #1b203f;
    .title {
      padding: 16px 23px;
      color: #fff;
      font-size: 14px;
    }
    .select {
      margin-right: 15px;
    }
  }
  .list {
    padding: 20px 24px;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      margin-bottom: 13px;
      .rank1 {
        background: #ff2366;
        text-align: center;
        font-size: 14px;
        display: inline-block;
        width: 29px;
        height: 29px;
        line-height: 29px;
        border-radius: 7px;
      }
      .rank2 {
        background: #ffd950;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        width: 29px;
        height: 29px;
        line-height: 29px;
        border-radius: 7px;
      }
      .rank3 {
        background: #02bc77;
        text-align: center;
        font-size: 14px;
        display: inline-block;
        width: 29px;
        height: 29px;
        line-height: 29px;
        border-radius: 7px;
      }
      .rank {
        text-align: center;
        display: inline-block;
        font-size: 14px;
        width: 29px;
        height: 29px;
        line-height: 29px;
        border-radius: 7px;
        background: #4791ff;
      }
      .orgName {
        flex: 1;
        font-size: 14px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 20px 0 20px;
      }
      .data {
        font-size: 16px;
      }
    }
  }
  .more {
    text-align: center;
    color: #fff;
    margin: -20px 0 15px 0;
    span {
      border-radius: 8px;
      background-color: rgba(71, 145, 255, 0.17);
      color: #4791ff;
      padding: 5px 18px;
      font-size: 14px;
      &:active {
        background-color: rgba(71, 145, 255, 0.3);
      }
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #1b203f;
  }
  .title {
    padding: 16px 23px;
    color: #fff;
    font-size: 14px;
    //   border-top-left-radius: 10px;
    //   border-top-right-radius: 10px;
  }
}
</style>
