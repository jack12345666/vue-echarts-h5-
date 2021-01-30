import Vue from 'vue'
import Vuex from 'vuex'
import {
  getDataInfo,
  getIndexOrgRank,
  getOrgIndexInfo,
  getIndexIndustryRank,
  getIndexStreetRank,
  getIndustryIndexList,
  getStreetIndexList
} from '../api/muchan'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gradeOrgs: [], //  当前工作下A,B,C,D等级的数量
    industries: [], // 行业列表
    calcIndicators: [], //
    orgRankIndicatorVals: [], // 默认第一个指标下企业数据排名
    orgIndicatorVals: [], // 默认第一个企业的全部指标数据
    indicatorIndustryRanks: [], // 默认
    threeIndustryValArr: [], // 默认比较前3个行业的指标情况，数组里的第一个就是用来显示第一个行业的雷达图
    districts: [], // 街道列表
    threeDistrictValArr: [], // 默认比较前3个街道的指标情况，数组里的第一个就是用来显示第一个街道的雷达图
    indicatorDistrictRanks: [], //
    evaluations: [], // 计算指标列表
    evaluationOrgs: [],
    selectIndex: null
  },
  actions: {
    async fetchDataInfo(_, data) {
      const rsp = await getDataInfo(data)
      return rsp
    },
    async fetchIndexOrgRank(_, id) {
      const rsp = await getIndexOrgRank(id)
      return rsp
    },
    async fetchIndexOrgInfo(_, id) {
      const rsp = await getOrgIndexInfo(id)
      return rsp
    },
    async fetchIndexIndustryRank(_, id) {
      const rsp = await getIndexIndustryRank(id)
      return rsp
    },
    async fetchIndexStreetRank(_, id) {
      const rsp = await getIndexStreetRank(id)
      return rsp
    },
    async fetchIndustryIndexList(_, ids) {
      const rsp = await getIndustryIndexList(ids)
      return rsp
    },
    async fetchStreetIndexList(_, ids) {
      const rsp = await getStreetIndexList(ids)
      return rsp
    }
  },
  mutations: {
    changeDataInfo(state, payload) {
      state.gradeOrgs = payload.gradeOrgs
      state.evaluationOrgs = payload.evaluationOrgs
      state.evaluations = payload.evaluations
      state.orgIndicatorVals = payload.orgIndicatorVals
      state.calcIndicators = payload.calcIndicators
      state.industries = payload.industries
      state.indicatorIndustryRanks = payload.indicatorIndustryRanks
      state.orgRankIndicatorVals = payload.orgRankIndicatorVals
      state.threeIndustryValArr = payload.threeIndustryValArr
      state.districts = payload.districts
      state.threeDistrictValArr = payload.threeDistrictValArr
      state.indicatorDistrictRanks = payload.indicatorDistrictRanks
    },
    changeIndexOrgRank(state, payload) {
      state.orgRankIndicatorVals = payload
    },
    changeIndexIndustryRank(state, payload) {
      state.indicatorIndustryRanks = payload
    },
    changeIndexStreetRank(state, payload) {
      state.indicatorDistrictRanks = payload
    },
    changeThreeIndustryList(state, payload) {
      state.threeIndustryValArr = payload
    },
    changeThreeStreetList(state, payload) {
      state.threeDistrictValArr = payload
    },
    changeSelectIndex(state, payload) {
      state.selectIndex = payload
    }
  }
})
