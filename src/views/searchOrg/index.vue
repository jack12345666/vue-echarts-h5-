<template>
  <base-layout>
    <div slot="header">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
      <div class="select">
        <van-dropdown-menu active-color="#666">
          <van-dropdown-item
            v-model="selectIndex"
            :options="selectList"
            @change="changeIndex"
          />
        </van-dropdown-menu>
      </div>
    </div>
    <div slot="content">
      <div class="list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in searchOrgList"
              :key="index"
              class="listItem"
              @click="checkOrg(item.evalOrg, item.orgName)"
            >
              <div v-if="index < 3" :class="`rank${index + 1}`">
                {{ index + 1 }}
              </div>
              <div v-else class="rank">
                {{ index + 1 }}
              </div>
              <div class="orgName">
                {{ item.orgName }}
              </div>
              <div class="data">
                {{ item.evalValue }}
                <span>
                  <van-icon name="arrow" size="16px" color="#4791ff" />
                </span>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>

        <van-empty v-if="searchOrgList.length === 0" description="暂无内容" />
      </div>
    </div>
  </base-layout>
</template>

<script>
import { getIndexOrgRank } from '../../api/muchan'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '',
      selectList: [],
      loading: false,
      finished: false,
      refreshing: false,
      searchConf: {
        pageIndex: 1,
        pageSize: 20,
        search: '',
        indicator: null
      },
      searchOrgList: []
    }
  },
  computed: {
    ...mapState(['calcIndicators', 'selectIndex'])
  },
  created() {
    if (this.calcIndicators.length > 0) {
      this.calcIndicators.forEach(item => {
        this.selectList.push({
          text: item.name,
          value: item.id
        })
      })
      if (!this.selectIndex) {
        this.$store.commit('changeSelectIndex', this.calcIndicators[0].id)
      }
      this.firstLoad()
    }
  },
  methods: {
    async firstLoad() {
      this.searchConf.indicator = this.selectIndex
      const rsp = await getIndexOrgRank(this.searchConf)
      if (rsp && rsp.code === '0') {
        this.searchOrgList = rsp.datas
        this.refreshing = false
      }
    },
    async onLoad() {
      this.searchConf.pageIndex++
      let rsp = await getIndexOrgRank(this.searchConf)
      if (rsp.datas.length === 0) {
        this.loading = false
        this.finished = true
      } else {
        this.searchOrgList = this.searchOrgList.concat(rsp.datas)
        this.loading = false
      }
    },
    async onRefresh() {
      this.finished = false
      this.refreshing = true
      this.searchConf.pageIndex = 1
      this.firstLoad()
    },
    onSearch() {
      this.searchConf.pageIndex = 1
      this.searchConf.search = this.value
      this.searchOrgList = []
      this.firstLoad()
    },
    changeIndex(value) {
      this.searchOrgList = []
      this.$store.commit('changeSelectIndex', value)
      this.firstLoad()
    },
    checkOrg(id, name) {
      this.$router.push({ path: '/detail', query: { id, name } })
    }
  }
}
</script>
<style>
.van-search {
  padding: 20px 30px;
  background-color: #1b203f;
}
.van-search .van-cell {
  background-color: #2c325c;
  border-radius: 10px;
}
.van-icon-search::before {
  color: #4791ff;
  size: 24px;
}
.van-field__control {
  color: #fff;
}
.van-search__content {
  background-color: #2c325c;
  color: #fff;
  border-radius: 10px;
}
.van-dropdown-menu__bar {
  height: 32px;
  border: 1px solid #1b203f;
  background-color: #2c325c;
  border-radius: 10px;
  padding-right: 10px;
  max-width: 174px;
}
.van-dropdown-menu__title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
}
.van-dropdown-menu__title::after {
  color: #fff;
}
.van-popup {
  background-color: #2c325c;
  color: #fff;
}
.van-dropdown-item__content {
  background-color: #2c325c;
  margin-left: 29px;
  width: 317px;
}
.van-popup--top {
  background-color: #2c325c;
}
.van-dropdown-item__option {
  font-size: 12px;
  padding: 5px 8px;
  background-color: #2c325c;
  color: #fff;
}
.van-cell::after {
  border: none;
}
</style>
<style lang="less" scoped>
.select {
  display: flex;
  justify-content: flex-end;
  margin: -10px 30px 10px 0;
}
.list {
  padding: 10px 30px;
  .listItem {
    margin-bottom: 2px;
    border-radius: 5px;
    background-color: #2c325c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 23px;
    color: #fff;
    &:active {
      background-color: rgba(27, 32, 63, 0.6);
    }
    .rank1 {
      background: #ff2366;
      text-align: center;
      font-size: 14px;
      display: inline-block;
      width: 29px;
      height: 29px;
      line-height: 29px;
      border-radius: 7px;
    }
    .rank2 {
      background: #ffd950;
      text-align: center;
      display: inline-block;
      font-size: 14px;
      width: 29px;
      height: 29px;
      line-height: 29px;
      border-radius: 7px;
    }
    .rank3 {
      background: #02bc77;
      text-align: center;
      font-size: 14px;
      display: inline-block;
      width: 29px;
      height: 29px;
      line-height: 29px;
      border-radius: 7px;
    }
    .rank {
      text-align: center;
      display: inline-block;
      font-size: 14px;
      width: 29px;
      height: 29px;
      line-height: 29px;
      border-radius: 7px;
      background: #4791ff;
    }
    .orgName {
      flex: 1;
      font-size: 14px;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0 20px 0 20px;
    }
    .data {
      font-size: 14px;
      span {
        padding-left: 10px;
      }
    }
  }
}
</style>
