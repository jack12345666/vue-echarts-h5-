import request from '../utils/request'
import { stringify } from 'qs'

export function getDataInfo(data) {
  return request({
    url: '/companyHome/employeeStatisMuChangHomePage',
    method: 'post',
    data: stringify(data)
  })
}

// 获取某指标，各企业排名
export function getIndexOrgRank(data) {
  return request({
    url: '/companyHome/employeeStatisMuChangGetIndicatorOrgsRank',
    method: 'post',
    data: stringify(data)
  })
}

// 获取企业指标数据
export function getOrgIndexInfo(id) {
  return request({
    url: '/companyHome/employeeStatisMuChangGetOrgIndicators',
    method: 'post',
    data: `evalOrg=${id}`
  })
}

// 获取某指标，各行业排名
export function getIndexIndustryRank(id) {
  return request({
    url: '/companyHome/employeeStatisMuChangGetIndicatorIndustriesRank',
    method: 'post',
    data: `indicator=${id}`
  })
}

// 获取行业的指标数据
export function getIndustryIndexList(ids) {
  return request({
    url: '/companyHome/employeeStatisMuChangGetIndustryIndicatorsVal',
    method: 'post',
    data: `industries=${ids}`
  })
}

// 获取某指标，平台街道排名
export function getIndexStreetRank(id) {
  return request({
    url: '/companyHome/employeeStatisMuChangGetIndicatorAreasRank',
    method: 'post',
    data: `indicator=${id}`
  })
}

// 获取某平台各指标平均值数据
export function getStreetIndexList(ids) {
  return request({
    url: '/companyHome/employeeStatisMuChangGetAreaIndicatorsVal',
    method: 'post',
    data: `areas=${ids}`
  })
}

// 搜索企业
export function getOrgByNameLike(data) {
  return request({
    url: '/companyHome/employeeStatisMuChangSearchOrg',
    method: 'post',
    data: stringify(data)
  })
}
