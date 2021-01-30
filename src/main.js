import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App.vue'
import './plugins/vant'
import store from './store'
import router from './router'
// 安装基础组件 与自定义组件
import BaseComponent from './base'
import CustomComponent from './components'
import {
  dingdingCloseCurrentPage,
  dingdingIoswebViewBounce
} from './utils/dingding'
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(BaseComponent, {})
Vue.use(CustomComponent, {})

// 引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// 处理点击事件延迟300ms问题
FastClick.attach(document.body)

dingdingCloseCurrentPage()
dingdingIoswebViewBounce()

// 开发环境下面使用vConsole进行调试
// if (process.env.NODE_ENV === 'development') {
//   const VConsole = require('vconsole')
//   new VConsole()
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
