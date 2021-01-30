<template>
  <div class="container">
    <van-loading
      v-if="loading"
      class="loading"
      size="24px"
      color="#fff"
      vertical
    >
      加载中...
    </van-loading>
    <div v-else class="content">
      <org-grade />
      <org-rank />
      <index-component />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.$store.dispatch('fetchDataInfo').then(rsp => {
      this.$store.commit('changeDataInfo', rsp)
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background-color: #1b203f;
  min-height: 100vh;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
