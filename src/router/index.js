import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/views/main')
const SearchOrg = () => import('@/views/searchOrg')
const OrgDetail = () => import('@/views/orgDetail')

const originalPush = VueRouter.prototype.push

// 处理路由跳转会报错的问题
VueRouter.prototype.push = function push(...rest) {
  return originalPush.apply(this, rest).catch(err => err)
}

Vue.use(VueRouter)

const routes = []

routes.push(
  ...[
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { title: '驾驶舱', keepAlive: true }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchOrg,
      meta: { title: '驾驶舱', keepAlive: false }
    },
    {
      path: '/detail',
      name: 'detail',
      component: OrgDetail,
      meta: { title: '驾驶舱', keepAlive: false }
    }
  ]
)

const router = new VueRouter({
  routes,
  // 页面滚动行为
  scrollBehavior(/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
