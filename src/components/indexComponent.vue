<template>
  <div class="box">
    <div class="tabs">
      <van-tabs
        v-model="active"
        type="card"
        color="#2C325C"
        background="#191E3C"
        title-inactive-color="#888B9A"
        @change="changeTabs"
      >
        <van-tab title="行业">
          <div class="content">
            <div class="header">
              <div class="title">
                行业指标
              </div>
              <div class="indexName">
                {{ industryIndexName }}
              </div>
            </div>
            <div class="indexList">
              <div class="nameList">
                <div
                  v-for="(item, index) in calcIndicators"
                  :key="item.id"
                  class="name"
                  @click="checkIndustryIndex(item, index)"
                >
                  <div :class="colorList[index]"></div>
                  <div class="value">
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="dataList">
                <div
                  v-for="item in indicatorIndustryRanks.slice(0, 6)"
                  :key="item.bigNo"
                  class="item"
                >
                  <div class="progress">
                    <div class="num">
                      <div class="label">
                        {{ item.name }}
                      </div>
                      <div class="value">
                        {{ item.indicatorVal.toFixed(2) }}
                      </div>
                    </div>
                    <van-progress
                      :percentage="
                        (item.indicatorVal / industryMax[index]) * 100
                      "
                      stroke-width="5"
                      :color="checkInstryColor"
                      track-color="#5E5E5E"
                      :show-pivot="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="infoContent">
            <div class="title">
              行业信息
            </div>
            <div class="infoList">
              <van-checkbox-group
                v-model="defaultCheckIndustry"
                :max="3"
                direction="horizontal"
                @change="changeIndustryCheck"
              >
                <div class="col">
                  <div
                    v-for="item in industries"
                    :key="item.bigNo"
                    class="checkItem"
                  >
                    <van-checkbox
                      :name="item.bigNo + '-' + item.name"
                      shape="square"
                      icon-size="18px"
                      style="font-size: 13px;"
                      checked-color="#4791FF"
                    >
                      <span style="color: #fff;" :title="item.name">{{
                        item.name
                      }}</span>
                    </van-checkbox>
                  </div>
                </div>
              </van-checkbox-group>
            </div>
            <div class="chart">
              <bar-chart
                :id="'industryId'"
                ref="barChart"
                :legend-list="checkIndustryLabel"
                :bar-data="inBarData"
              />
            </div>
          </div>
        </van-tab>
        <van-tab title="街道">
          <div class="content">
            <div class="header">
              <div class="title">
                街道指标
              </div>
              <div class="indexName">
                {{ streetIndexName }}
              </div>
            </div>
            <div class="indexList">
              <div class="nameList">
                <div
                  v-for="(item, index) in calcIndicators"
                  :key="item.id"
                  class="name"
                  @click="checkStreetIndex(item, index)"
                >
                  <div :class="colorList[index]"></div>
                  <div class="value">
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="dataList">
                <div
                  v-for="item in indicatorDistrictRanks.slice(0, 6)"
                  :key="item.districtId"
                  class="item"
                >
                  <div class="progress">
                    <div class="num">
                      <div class="label">
                        {{ item.districtName }}
                      </div>
                      <div class="value">
                        {{ item.indicatorVal.toFixed(2) }}
                      </div>
                    </div>
                    <van-progress
                      :percentage="
                        (item.indicatorVal / streetMax[streetIndex]) * 100
                      "
                      stroke-width="5"
                      :color="checkStreetColor"
                      track-color="#5E5E5E"
                      :show-pivot="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="infoContent">
            <div class="title">
              街道信息
            </div>
            <div class="infoList">
              <van-checkbox-group
                v-model="defaultCheckStreet"
                :max="3"
                direction="horizontal"
                @change="changeStreetCheck"
              >
                <div class="col">
                  <div
                    v-for="item in districts"
                    :key="item.id"
                    class="checkItem"
                  >
                    <van-checkbox
                      :name="item.id + '-' + item.name"
                      shape="square"
                      icon-size="18px"
                      style="font-size: 13px;"
                      checked-color="#4791FF"
                    >
                      <span style="color: #fff;" :title="item.name">{{
                        item.name
                      }}</span>
                    </van-checkbox>
                  </div>
                </div>
              </van-checkbox-group>
            </div>
            <div class="chart">
              <bar-chart
                :id="'streetId'"
                ref="streetBarChart"
                :legend-list="checkStreetLabel"
                :bar-data="streetBarData"
              />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BarChart from '../components/echart/barChart'
import { mapState } from 'vuex'
export default {
  components: { 'bar-chart': BarChart },
  data() {
    return {
      industryIndexName: '',
      streetIndexName: '',
      active: 0,
      index: 0,
      streetIndex: 0,
      colorList: ['sign a', 'sign b', 'sign c', 'sign d', 'sign e', 'sign f'],
      checkInstryColor: '#50FFEE',
      checkStreetColor: '#50FFEE',
      colorObj: {
        0: '#50FFEE',
        1: '#AF47FF',
        2: '#FF2366',
        3: '#FFD950',
        4: '#02BC77',
        5: '#4791FF'
      },
      industryMax: [160, 700, 200, 13500, 15, 150],
      streetMax: [110, 450, 65, 8200, 5, 120],
      checkIndustryLabel: [],
      checkIndustryValue: [],
      checkStreetLabel: [],
      checkStreetValue: [],
      defaultCheckIndustry: [],
      defaultCheckStreet: [],
      radarInData: [],
      radarStreetData: [],
      inBarData: [[], [], []],
      streetBarData: [[], [], []],
      infoIndex: 0,
      infoStreetIndex: 0
    }
  },
  computed: {
    ...mapState([
      'calcIndicators',
      'indicatorIndustryRanks',
      'indicatorDistrictRanks',
      'industries',
      'districts',
      'threeIndustryValArr',
      'threeDistrictValArr'
    ])
  },
  created() {
    this.industryIndexName = this.calcIndicators[0].name
    this.streetIndexName = this.calcIndicators[0].name
    this.checkIndustryLabel = [
      `${this.industries[0].name}`,
      `${this.industries[1].name}`,
      `${this.industries[2].name}`
    ]
    this.checkStreetLabel = [
      `${this.districts[0].name}`,
      `${this.districts[1].name}`,
      `${this.districts[2].name}`
    ]
    this.defaultCheckIndustry = [
      `${this.industries[0].bigNo}-${this.industries[0].name}`,
      `${this.industries[1].bigNo}-${this.industries[1].name}`,
      `${this.industries[2].bigNo}-${this.industries[2].name}`
    ]
    this.defaultCheckStreet = [
      `${this.districts[0].id}-${this.districts[0].name}`,
      `${this.districts[1].id}-${this.districts[1].name}`,
      `${this.districts[2].id}-${this.districts[2].name}`
    ]
    this.changeIndustryChart()
  },
  methods: {
    changeTabs(name) {
      if (name === 1) {
        this.changeStreetChart()
      } else {
        this.changeIndustryChart()
      }
    },
    checkIndustryIndex(item, index) {
      this.index = index
      this.industryIndexName = item.name
      this.$store.dispatch('fetchIndexIndustryRank', item.id).then(rsp => {
        this.$store.commit('changeIndexIndustryRank', rsp.datas)
      })
      this.checkInstryColor = this.colorObj[index]
    },
    checkStreetIndex(item, index) {
      this.streetIndex = index
      this.streetIndexName = item.name
      this.$store.dispatch('fetchIndexStreetRank', item.id).then(rsp => {
        this.$store.commit('changeIndexStreetRank', rsp.datas)
      })
      this.checkStreetColor = this.colorObj[index]
    },
    changeIndustryCheck(value) {
      this.checkIndustryLabel = []
      this.checkIndustryValue = []
      if (value.length > 0) {
        value.forEach(item => {
          this.checkIndustryLabel.push(item.split('-')[1])
          this.checkIndustryValue.push(item.split('-')[0])
        })
      }
      if (this.checkIndustryValue.length === 3) {
        this.$store
          .dispatch('fetchIndustryIndexList', this.checkIndustryValue.join(','))
          .then(rsp => {
            this.$store.commit('changeThreeIndustryList', [])
            this.$store.commit('changeThreeIndustryList', rsp.industryValArr)
            this.changeIndustryChart()
          })
      }
    },
    changeStreetCheck(value) {
      this.checkStreetLabel = []
      this.checkStreetValue = []
      if (value.length > 0) {
        value.forEach(item => {
          this.checkStreetLabel.push(item.split('-')[1])
          this.checkStreetValue.push(item.split('-')[0])
        })
      }
      if (this.checkStreetValue.length === 3) {
        this.$store
          .dispatch('fetchStreetIndexList', this.checkStreetValue.join(','))
          .then(rsp => {
            this.$store.commit('changeThreeStreetList', [])
            this.$store.commit('changeThreeStreetList', rsp.threeDistrictValArr)
            this.changeStreetChart()
          })
      }
    },
    changeIndustryChart() {
      this.inBarData = [[], [], []]
      if (this.threeIndustryValArr.length === 3) {
        this.threeIndustryValArr[0].industryIndicatorVals.forEach(item => {
          this.inBarData[0].push(item.indicatorVal.toFixed(2))
        })
        this.threeIndustryValArr[1].industryIndicatorVals.forEach(item => {
          this.inBarData[1].push(item.indicatorVal.toFixed(2))
        })
        this.threeIndustryValArr[2].industryIndicatorVals.forEach(item => {
          this.inBarData[2].push(item.indicatorVal.toFixed(2))
        })
      }

      this.$refs.barChart.renderBarChart()
    },
    changeStreetChart() {
      this.streetBarData = [[], [], []]
      if (this.threeDistrictValArr.length === 3) {
        this.threeDistrictValArr[0].districtIndicatorVals.forEach(item => {
          this.streetBarData[0].push(item.indicatorVal.toFixed(2))
        })
        this.threeDistrictValArr[1].districtIndicatorVals.forEach(item => {
          this.streetBarData[1].push(item.indicatorVal.toFixed(2))
        })
        this.threeDistrictValArr[2].districtIndicatorVals.forEach(item => {
          this.streetBarData[2].push(item.indicatorVal.toFixed(2))
        })
      }
      this.$refs.streetBarChart.renderBarChart()
    }
  }
}
</script>
<style>
.van-tabs__nav--card {
  border-radius: 5px;
  border: 1px solid #4791ff;
}
</style>
<style lang="less" scoped>
.box {
  margin: 0 13px;
  .tabs {
    margin: 17px 0;
    width: 100%;
    border-radius: 5px 0px 0px 5px;
    .content {
      margin: 11px 15px 19px 15px;
      background-color: #2c325c;
      color: #fff;
      border-radius: 12px;
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
        .indexName {
          margin-right: 15px;
          font-size: 14px;
          max-width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .indexList {
        .nameList {
          margin-bottom: 30px;
          .name {
            display: flex;
            align-items: center;
            color: #fff;
            padding: 5px 10px;
            .sign {
              margin-right: 10px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }
            .a {
              background-color: #50ffee;
            }
            .b {
              background-color: #af47ff;
            }
            .c {
              background-color: #ff2366;
            }
            .d {
              background-color: #ffd950;
            }
            .e {
              background-color: #02bc77;
            }
            .f {
              background-color: #4791ff;
            }
            .value {
              font-size: 14px;
            }
          }
        }
        .dataList {
          padding: 0 10px 15px 10px;
          .item {
            display: flex;
            align-items: center;
            padding: 8px 0;
            .progress {
              width: 100%;
              overflow: hidden;
              .num {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 3px;
                .label {
                  font-size: 14px;
                  color: #fff;
                  max-width: 230px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .value {
                  color: #d7dadb;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }

    .infoContent {
      margin: 11px 15px 19px 15px;
      background-color: #2c325c;
      color: #fff;
      border-radius: 12px;
      .title {
        padding: 16px 23px;
        color: #fff;
        font-size: 14px;
        border-bottom: 1px solid #1b203f;
      }
      .infoList {
        padding: 10px;
        .col {
          display: flex;
          width: 300px;
          flex-wrap: wrap;
          .checkItem {
            margin-bottom: 19px;
            width: 142px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .chart {
        overflow-x: auto;
        padding-bottom: 8px;
      }
    }
  }
}
</style>
