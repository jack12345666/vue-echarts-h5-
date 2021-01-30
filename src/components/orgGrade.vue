<template>
  <div class="box">
    <div class="itemList">
      <div
        v-for="(item, index) in gradeOrgs"
        :key="item.evaluationId"
        class="item"
      >
        <div class="top">
          <div class="grade">
            {{ gradeList[index] }}
          </div>
          <div class="text">
            级
          </div>
        </div>
        <div class="num">
{{ item.orgSum }}家
</div>
        <div class="progress">
          <van-progress
            :percentage="(item.orgSum / 500) * 100"
            :show-pivot="false"
            stroke-width="8px"
            track-color="#555"
            :color="progressList[index]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      gradeList: ['A', 'B', 'C', 'D'],
      progressList: [
        'linear-gradient(to right, #F95295, #FADBA5)',
        'linear-gradient(to right, #147AD6, #79CEF0)',
        'linear-gradient(to right, #02BC77, #A5FAD2)',
        'linear-gradient(to right, #F0FF23, #A5FAB3)'
      ]
    }
  },
  computed: {
    ...mapState(['gradeOrgs'])
  }
}
</script>

<style lang="less" scoped>
.box {
  .itemList {
    display: flex;
    padding: 23px 17px;
    .item {
      flex: 1;
      border-right: 2px solid rgba(242, 242, 242, 0.5);
      padding: 0 12px;
      &:last-child {
        border: none;
      }
      .top {
        display: flex;
        color: #fff;
        justify-content: center;
        .grade {
          font-size: 34px;
        }
        .text {
          font-size: 12px;
          margin: 5px 0 0 8px;
        }
      }
      .num {
        color: #b8b8b8;
        font-size: 12px;
        text-align: center;
        margin-bottom: 4px;
      }
      .progress {
        width: 100%;
      }
    }
  }
}
</style>
