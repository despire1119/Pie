<template>
  <div>
    <ul class="tabs">
      <li @click="popupShow('area')">
        <span>红太阳幼儿一班</span>
        <i class="fa fa-angle-down icon-down"></i>
      </li>
      <li @click="popupShow('time')">
        <span>第一学期</span>
        <i class="fa fa-angle-down icon-down"></i>
      </li>
    </ul>
    <div class="counts">
      <div class="date-picker">
        <div class="picker-contain">
          <span class="date">{{timer}}</span>
          <i class="fa fa-calendar icon-date"></i>
          <datetime class="time-hider" v-model="timer" format="YYYY年MM月" @on-change="toConsole"></datetime>
        </div>
      </div>
      <ul class="count-area" v-if="type == 1">
        <li>
          <p class="contain">50</p>
          <p class="tit">总人数(人)</p>
        </li>
        <li>
          <p class="contain">20</p>
          <p class="tit">已收人数(人)</p>
        </li>
      </ul>
      <div class="count-area fee-all">
        <p class="mount">￥52400</p>
        <p class="tit">总收入(元)</p>
      </div>
    </div>
    <div v-if="type == 1" class="echarts-area" ref="myEcharts"></div>
    <div v-if="type == 2" class="echarts-area with-no-head" ref="myBar"></div>
    <div class="fee-detail">
      <p class="tit">收费明细</p>
      <ul class="detail-list">
        <li>
          <i class="fa fa-video-camera icon-header"></i>
          <div class="container">
            <p class="cent-tit">学费42%</p>
            <div class="progress-box">
              <x-progress :show-cancel="false" :percent="42"></x-progress>
            </div>
          </div>
          <div class="info">
            <p class="fee">￥2000.00</p>
            <p class="count">4笔</p>
          </div>
          <i class="fa fa-angle-right icon-right"></i>
        </li>
        <li>
          <i class="fa fa-graduation-cap icon-header"></i>
          <div class="container">
            <p class="cent-tit">学费28%</p>
            <div class="progress-box">
              <x-progress :show-cancel="false" :percent="28"></x-progress>
            </div>
          </div>
          <div class="info">
            <p class="fee">￥2000.00</p>
            <p class="count">4笔</p>
          </div>
          <i class="fa fa-angle-right icon-right"></i>
        </li>
      </ul>
    </div>
    <popup v-model="areaShow" position="top">
      <ul class="tabs">
        <li @click="popupShow('area')">
          <span>红太阳幼儿一班</span>
          <i class="fa fa-angle-up icon-down"></i>
        </li>
        <li @click="popupShow('time')">
          <span>第一学期</span>
          <i class="fa fa-angle-up icon-down"></i>
        </li>
      </ul>
      <div v-if="tabType == 'area'">
        <div class="sel-area">
          <div class="sel-list">
            <p class="tit">园所</p>
            <ul class="list-cell">
              <li class="selected">红太阳园所</li>
              <li>小葵花园所</li>
            </ul>
          </div>
          <div class="sel-list">
            <p class="tit">班级</p>
            <ul class="list-cell">
              <li>小幼一班</li>
              <li class="selected">小幼一班</li>
              <li>小幼一班</li>
              <li>小幼一班</li>
              <li>小幼一班</li>
            </ul>
          </div>
          <div class="sel-list">
            <p class="tit">个人</p>
            <ul class="list-cell">
              <li>王老师</li>
              <li>王老师</li>
              <li class="selected">王老师</li>
              <li>王老师</li>
              <li>王老师</li>
            </ul>
          </div>
          <div class="sel-list">
            <p class="tit">收费种类</p>
            <ul class="list-cell">
              <li>直播</li>
              <li>学费</li>
              <li class="selected">有声读物</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="tabType == 'time'">
        <div class="sel-area">
          <div class="sel-list">
            <p class="tit">学期</p>
            <ul class="list-cell list-wrap">
              <li class="selected">第一学期</li>
              <li>第二学期</li>
            </ul>
          </div>
        </div>
      </div>
      <div></div>
    </popup>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
// import BottomBar from "@/components/common/BottomBar";
// import utils from "@/assets/utils";
// import { XProgress } from 'vux'

export default {
  name: "index",
  data() {
    return {
      timer: "2019年06月",
      perDataList: [
        { value: 35, name: "学费" },
        { value: 33, name: "有声读物" },
        { value: 40, name: "直播" }
      ],
      allMoney: "60000.00",
      areaShow: false,
      tabType: "time",
      type: 1
      // percent: 20
    };
  },
  methods: {
    popupShow(str) {
      this.tabType = str;
      this.areaShow = true;
    },
    toConsole(item) {
      console.log(item);
    },
    initBar() {
      let myBar = this.$echarts.init(this.$refs.myBar);
      myBar.setOption({
        title: {
          subtext: "(万元/园所)"
        },
        color: ["#d20133"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            //根据接口数据结构编写计算属性（取名称push出list）
            data: ["小红花", "小黄花", "小蓝花", "小绿花", "小青花"],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: "#999"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ddd"
              }
            }
          }
        ],
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ddd"
            }
          }
        },
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            barWidth: "15%",
            //柱子灰色半透明背景
            //根据接口数据结构编写计算属性（取最大值 + 1 ，push出长度相同的list）
            data: [10, 10, 10, 10, 10],
            animation: false
          },
          {
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            //柱状图值
            //根据接口数据结构编写计算属性（取接口值push出list）
            data: [1, 5, 2, 4, 9]
          }
        ]
      });
    },
    initPie() {
      let myEcharts = this.$echarts.init(this.$refs.myEcharts);
      myEcharts.setOption({
        backgroundColor: "#fff",
        // padding: 0,
        title: {
          text: `￥${this.allMoney}`,
          subtext: "————  总收入  ————",
          left: "center",
          textStyle: {
            color: "#d20133"
          },
          subtextStyle: {
            lineHeight: 0,
            color: "#a4a4a4"
          }
        },
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b} : {c} ({d}%)"
        // },
        series: [
          {
            // selectedMode: 'single',
            name: "什么鬼",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            color: ["#d20133", "#f9b630", "#ff6e48"],
            data: this.perDataList.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                formatter: "{a|{d}%} \n {b|{b}}",
                rich: {
                  a: {
                    fontSize: "18",
                    color: "#000",
                    align: "center"
                  },
                  b: {
                    fontSize: "12",
                    color: "#a8a8a8",
                    align: "center"
                  }
                }
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
    }
  },
  components: {
    // XProgress
  },
  created() {
    this.type = this.$route.query.type;
  },
  mounted() {
    this.type == 1 ? this.initPie() : this.initBar();
  },
  computed: {
    // ...mapState({
    //   wxUserid: state => state.normal.wxUserid
    // })
  }
};
</script>

<style lang="stylus">
.tabs
  background-color #fff
  display flex
  padding 24px 0 17px
  color #4a4a4a
  .icon-down
    margin-left 12px
    color #aaa
  li
    flex 1
    display flex
    align-items center
    justify-content center
    font-size 26px
    &:first-child
      border-right 1px solid #efefef
    i
      width 25px
      height 25px
.counts
  margin-top 20px
  background-color #fff
  .date-picker
    display flex
    justify-content center
    padding-top 40px
    .picker-contain
      position relative
      display flex
      width 325px
      height 70px
      border 1px solid #d8d8d8
      border-radius 5px
      color #4a4a4a
      .icon-date
        font-size 35px
        text-align center
        line-height 70px
      .time-hider
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        opacity 0
      .date
        flex 1
        line-height 70px
        display inline-block
        text-align center
        border-right 1px solid #d8d8d8
        font-size 26px
        font-weight bold
      i
        display inline-block
        width 70px
        height 70px
  .count-area
    display flex
    padding 40px 0
    li
      text-align center
      flex 1
      &:first-child
        border-right 1px solid #efefef
    .contain
      font-size 30px
      color #000
      margin-bottom 10px
      font-weight bold
    .tit
      font-size 26px
      color #9b9b9b
  .fee-all
    display flex
    flex-direction column
    justify-content center
    p
      text-align center
    .mount
      font-size 34px
      color #d20133
      font-weight bold
    .tit
      font-size 24px
.echarts-area
  height 460px
  margin-top 20px
  padding-top 40px
  background-color #fff
.with-no-head
  padding-top 0
.fee-detail
  margin-top 20px
  margin-bottom 20px
  background-color #fff
  .tit
    color #4a4a4a
    padding-top 47px
    padding-bottom 12px
    font-size 28px
    font-weight bold
    padding-left 33px
  .detail-list
    li
      display flex
      align-items center
      justify-content space-around
      padding 40px 0
      border-bottom 1px solid #efefef
      padding-left 33px
      .icon
        background-color #ddd
      .icon-header
        display flex
        align-items center
        justify-content center
        width 60px
        height 60px
        border-radius 60px
        background #72d9f4
        font-size 35px
        color #fff
      .icon-right
        display flex
        justify-content center
        align-items center
        width 20px
        height 33px
        font-size 38px
        color #c0c0c0
      .container
        width 400px
        .cent-tit
          font-size 28px
          margin-bottom 10px
      .progress-box
        overflow hidden
        height 20px
        border-radius 20px
      .info
        // width 168px
        text-align right
        .fee
          color #d20133
          font-size 22px
        .count
          color #9b9b9b
          font-size 26px
.sel-area
  border-top 1px solid #efefef
  background-color #fff
  padding-top 40px
  padding-left 30px
  padding-top 35px
  .tit
    font-size 28px
    color #9b9b9b
    margin-bottom 15px
  .list-cell
    display flex
    justify-content left
    flex-wrap wrap
    padding-bottom 20px
    li
      padding 10px 50px
      background-color #fff
      color #5b5c5c
      font-size 24px
      border 1px solid #9b9b9b
      border-radius 54px
      margin-right 40px
      margin-bottom 20px
    .list-wrap, .selected
      background-color #d20133
      color #fff
      border-color #d20133
  .list-wrap
    flex-direction column
    // flex-wrap no-wrap
    li
      max-width 200px
</style>
