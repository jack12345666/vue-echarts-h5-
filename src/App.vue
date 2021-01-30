<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  watch: {
    $route: {
      handler() {
        setTimeout(() => {
          // 避免首次获取不到window._czc
          if (window._czc) {
            let location = window.location
            let contentUrl = location.pathname + location.hash
            let refererUrl = '/'
            // 用于发送某个URL的PV统计请求，
            window._czc.push(['_trackPageview', contentUrl, refererUrl])
            window._czc.push(['_setAutoPageview', false])
          }
        }, 300)
      },
      immediate: true // 首次进入页面即执行
    }
  },
  mounted() {
    // 创建cnzz统计js
    const script = document.createElement('script')
    script.src = '//v1.cnzz.com/z_stat.php?id=1278696122&web_id=1278696122'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  }
}
</script>
<style lang="less">
#app {
  height: 100vh;
  font-family: PingFangSC-Regular;
  background-color: #f1f3f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/** 解决路由切换动画上下闪动问题 */
.router {
  position: absolute;
  top: safe-area-inset-top;
  top: env(safe-area-inset-top);
  width: 100%;
  transition: all 0.377s ease;
  backface-visibility: hidden;
}
</style>
