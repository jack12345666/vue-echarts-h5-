import { BASEURL } from './config'

export const imgFormat = value => {
  return BASEURL + value
}

export const priceFormat = value => {
  if (value === 0) {
    return '免费'
  } else if (value > 0) {
    return '￥' + value
  } else if (value < 0) {
    return '面议'
  }
}
