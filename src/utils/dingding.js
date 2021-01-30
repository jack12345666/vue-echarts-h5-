import * as dd from 'dingtalk-jsapi'
import { BASELOGINURL } from './config'
import { GetQueryString } from './utils'

// 钉钉方法

// 钉钉加载
export function dingdingLoading(msg = '加载中...') {
  dd.ready(function() {
    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
    dd.device.notification.showPreloader({
      text: msg, // loading显示的字符，空表示不显示文字
      showIcon: true, // 是否显示icon，默认true
      onSuccess: function() {
        /* {}*/
      },
      onFail: function() {}
    })
  })
}

// 钉钉隐藏加载
export function dingdingHideLoading() {
  dd.ready(function() {
    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
    dd.device.notification.hidePreloader({
      onSuccess: function() {
        /* {}*/
      },
      onFail: function() {}
    })
  })
}

// 钉钉Toast
/**
 *
 * @param {*} icon 'success'/'error'/ '', 默认 'success'
 * @param {*} msg string 内容
 */
export function dingdingToast(icon = 'success', msg) {
  dd.ready(function() {
    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
    dd.device.notification.toast({
      icon: icon, // icon样式，不同客户端参数不同，请参考参数说明
      text: msg, // 提示信息
      duration: 2, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
      delay: 0, // 延迟显示，单位秒，默认0
      onSuccess: function() {
        /* {}*/
      },
      onFail: function() {}
    })
  })
}

// 钉钉设置页面标题
/**
 *
 * @param {*} title
 */
export function dingdingTitle(title = '服务超市') {
  dd.ready(function() {
    dd.biz.navigation.setTitle({
      title: title, // 控制标题文本，空字符串表示显示默认文本
      onSuccess: function() {},
      onFail: function() {}
    })
  })
}

// 钉钉关闭当前页面(监听)
export function dingdingCloseCurrentPage() {
  dd.ready(() => {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // 判断是否是 android终端
    if (isAndroid) {
      document.addEventListener('backbutton', e => {
        // 安卓调用方式
        if (window.location.hash === '#/search') {
          e.preventDefault() // 阻止返回
          dd.biz.navigation.replace({
            url: BASELOGINURL + '/mallH5/index.html#/', // 新的页面链接
            onSuccess: function() {},
            onFail: function() {}
          })
        }
        // if(window.location.hash.startsWith('#/goodsDetail')) {
        //    e.preventDefault() //阻止返回
        //    console.log(window.location.hash.startsWith('#/goodsDetail'))
        //    location.reload()
        // }
        if (
          window.location.hash === '#/order' ||
          window.location.hash === '#/' ||
          window.location.hash === '#/cart'
        ) {
          e.preventDefault() // 阻止返回
          dd.biz.navigation.close({
            onSuccess: function() {},
            onFail: function() {}
          })
        }
      })
    } else {
      if (window.location.hash === '#/search') {
        dd.biz.navigation.replace({
          url: BASELOGINURL + '/mallH5/index.html#/', // 新的页面链接
          onSuccess: function() {},
          onFail: function() {}
        })
      }
      if (
        window.location.hash === '#/order' ||
        window.location.hash === '#/' ||
        window.location.hash === '#/cart'
      ) {
        // eslint-disable-next-line no-undef
        e.preventDefault() // 阻止返回
        dd.biz.navigation.setLeft({
          control: true,
          text: '',
          onSuccess: () => {
            // IOS调用方法 ios返回不起作用，需要手动让他返回window.history.go(-1)
            dd.biz.navigation.close({
              onSuccess: function() {},
              onFail: function() {}
            })
          },
          onFail() {}
        })
      }
    }
  })
}

// 钉钉关闭当前页面
export function dingdingClosePage() {
  dd.ready(() => {
    dd.biz.navigation.close({
      onSuccess: function() {},
      onFail: function() {}
    })
  })
}

// 钉钉打开新窗口
export function dingdingOpenLink(url = '') {
  dd.ready(() => {
    dd.biz.util.openLink({
      url: url, // 要打开链接的地址
      onSuccess: function() {},
      onFail: function() {}
    })
  })
}

// 钉钉禁用iOS Webview弹性效果
export function dingdingIoswebViewBounce() {
  dd.ready(() => {
    dd.ui.webViewBounce.disable()
  })
}

// 钉钉confirm
export function dingdingConfirm(msg = '登录后才能进行相关操作') {
  dd.ready(() => {
    dd.device.notification.confirm({
      message: msg,
      title: '',
      buttonLabels: ['去登录', '取消'],
      onSuccess: function(result) {
        if (result.buttonIndex == 0) {
          location.href =
            BASELOGINURL +
            '/mcenterH5/login.html?corpId=' +
            GetQueryString('corpId')
        }
      },
      onFail: function() {}
    })
  })
}

// 钉钉alert
export function dingdingAlert(msg) {
  dd.ready(() => {
    dd.device.notification.alert({
      message: msg,
      title: '提示', // 可传空
      buttonName: '收到',
      onSuccess: function() {},
      onFail: function() {}
    })
  })
}

// 钉钉鉴权配置
export function dingdingAuthConfig(data) {
  return dd.config({
    agentId: data.agentId, // 必填，微应用ID
    corpId: data.corpId, // 必填，企业ID
    timeStamp: data.timeStamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
    jsApiList: ['biz.clipboardData.setData'] // 必填，需要使用的jsapi列表，注意：不要带dd。
  })
}

// 钉钉复制到粘贴板
export function dingdingclipboardData(content) {
  dd.ready(() => {
    dd.biz.clipboardData.setData({
      text: content, // 要复制粘贴板的内容
      onSuccess: function() {
        dingdingToast('success', '复制粘贴板成功')
      },
      onFail: function() {}
    })
  })
}

// 钉钉modal
export function dingdingModal(data) {
  dd.ready(() => {
    dd.device.notification.modal({
      // image:"http://gw.alicdn.com/tps/i2/TB1SlYwGFXXXXXrXVXX9vKJ2XXX-2880-1560.jpg_200x200.jpg", // 标题图片地址
      // banner:["http://gw.alicdn.com/tps/i2/TB1SlYwGFXXXXXrXVXX9vKJ2XXX-2880-1560.jpg_200x200.jpg"],   // 图片地址列表
      title: data.fileName, // 标题
      content: data.filePath, // 文本内容
      buttonLabels: ['复制到粘贴板', '取消'], // 最多两个按钮，至少有一个按钮
      onSuccess: function(result) {
        if (result.buttonIndex == 0) {
          dingdingclipboardData(data.filePath)
        }
      },
      onFail: function() {}
    })
  })
}

// 钉钉复制粘贴板confirm
export function dingdingCopyConfirm(data) {
  dd.ready(() => {
    dd.device.notification.confirm({
      message: '复制下载链接到粘贴板去浏览器下载该附件',
      title: '',
      buttonLabels: ['复制到粘贴板', '取消'],
      onSuccess: function(result) {
        if (result.buttonIndex == 0) {
          dingdingclipboardData(data.filePath)
        }
      },
      onFail: function() {}
    })
  })
}
