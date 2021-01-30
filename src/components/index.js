function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default {
  install(Vue) {
    const requireComponent = require.context('.', false, /\.vue$/)
    requireComponent.keys().forEach(fileName => {
      const config = requireComponent(fileName)
      const componentName = changeStr(
        fileName.replace(/^\.\//, '').replace(/\.\w+$/, '') // ./child.vue => child
      )
      Vue.component(componentName, config.default || config) // 动态注册该目录下的所有.vue文件
    })
  }
}
