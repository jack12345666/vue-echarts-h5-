import axios from 'axios'
import {
  dingdingToast,
  dingdingLoading,
  dingdingHideLoading,
  dingdingConfirm
} from './dingding.js'
import { getCookieToken } from './utils'
import { BASEURL } from './config'

const errorHandle = status => {
  // 判断状态码
  switch (status) {
    case 500:
      dingdingToast('error', '找不到此服务，可能是在路上~')
      break
    case 503:
      dingdingToast('error', '服务器开小差了~请稍后')
      break
    default:
      dingdingToast('error', '网络错误')
  }

  return { data: '' }
}

// 新建了一个 axios 实例
const request = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true
})

request.interceptors.request.use(
  config => {
    dingdingLoading()
    config.headers['Authorization'] = encodeURIComponent(getCookieToken())
    return config
  },
  // 请求错误
  error => {
    Promise.reject(error)
  }
)

// 处理响应数据
request.interceptors.response.use(
  // 请求成功
  res => {
    dingdingHideLoading()
    if (res.data.code === 0) {
      return res.data
    } else if (res.data.code === 10) {
      dingdingConfirm()
    } else {
      dingdingToast('', res.data.msg)
    }

    return Promise.resolve(res.data)
  },
  err => {
    dingdingHideLoading()
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response.data)
    }
    return { data: '' }
  }
)

export default request
