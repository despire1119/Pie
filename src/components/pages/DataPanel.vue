<template>
  <div class="with-bottom-bar">
    <div class="panel-header">
      <div class="role-base">
        <div class="img-container">
          <img :src="userInfo.avatar" alt="">
        </div>
        <span v-if="userInfo.is_leader_in_dept === '0'">{{userInfo.name}}</span>
        <popup-picker v-if="userInfo.is_leader_in_dept === '1'" :data="leaderList" v-model="chosenLeader" @on-change="leaderChecker"></popup-picker>
        <i  v-if="userInfo.is_leader_in_dept === '1'" class="el-icon-arrow-down icon-pos"></i>
      </div>
      <div class="selector-panel">
        <popup-picker :data="options" v-model="choosenDay" @on-change="onChange"></popup-picker>
        <i class="el-icon-arrow-down icon-pos"></i>
      </div>
      <!-- <picker :data='options' v-model='cell' @on-change='change'></picker> -->
    </div>
    <div class="handle-panel">
      <div class="tit">
        <p class="tit-left">
          <span class="tip"></span>
          <span>顾客联系行为统计</span>
        </p>
        <p v-if="queryType === '1'" class="tit-right"><span class="inner-right">分数：{{concatList.mark}}</span><span class="inner-right">排名：{{concatList.ranking}}</span></p>
        <router-link to="/concat/data_concat" tag="i" v-if="queryType === '2'" class="el-icon-arrow-right"></router-link>
      </div>
      <table class="panel-body" frame="void">
        <tr>
          <td>
            <p class="table-data">{{concatList.addCount}}</p>
            <p class="table-des">添加顾客数</p>
          </td>
          <td>
            <p class="table-data">{{concatList.chatCount}}</p>
            <p class="table-des">聊天人数</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="table-data">{{concatList.chatReplyRatio}}</p>
            <p class="table-des">已回复聊天占比(%)</p>
          </td>
          <td>
            <p class="table-data">{{concatList.avgReplyDuration}}</p>
            <p class="table-des">平均首次回复时长(分钟)</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="handle-panel">
      <div class="tit">
        <p class="tit-left">
          <span class="tip"></span>
          <span>顾客消费行为统计</span>
        </p>
        <router-link to="/buy/data_concat" tag="i" v-if="queryType === '2'" class="el-icon-arrow-right"></router-link>
      </div>
      <table class="panel-body panel-body-3" frame="void">
        <tr>
          <td>
            <p class="table-data">{{consumeList.activityRate}}</p>
            <p class="table-des">活跃率(%)</p>
          </td>
          <td>
            <p class="table-data">{{consumeList.buyCount}}</p>
            <p class="table-des">客单价(元)</p>
          </td>
          <td>
            <p class="table-data">{{consumeList.customerUnitPrice}}</p>
            <p class="table-des">购物频次(次)</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="handle-panel">
      <div class="tit">
        <p class="tit-left">
          <span class="tip"></span>
          <span>优惠券统计</span>
        </p>
        <router-link to="/coupen/data_concat" tag="i" v-if="queryType === '2'" class="el-icon-arrow-right"></router-link>
      </div>
      <table class="panel-body panel-body-3" frame="void">
        <tr>
          <td>
            <p class="table-data">{{couponList.sendCount}}</p>
            <p class="table-des">发送数量(张)</p>
          </td>
          <td>
            <p class="table-data">{{couponList.useCount}}</p>
            <p class="table-des">使用数量(张)</p>
          </td>
          <td>
            <p class="table-data">{{couponList.avgUnitPrice}}</p>
            <p class="table-des">券平均客单价(元)</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="handle-panel">
      <div class="tit">
        <p class="tit-left">
          <span class="tip"></span>
          <span>新会员办卡及微信绑卡</span>
        </p>
        <p v-if="queryType === '1'" class="tit-right"><span class="inner-right">提成金额：{{customers.percentage}}元</span></p>
        <router-link tag="i" to="/add_new/data_concat" v-if="queryType === '2'" class="el-icon-arrow-right"></router-link>
      </div>
      <table class="panel-body panel-body-3" frame="void">
        <tr>
          <td>
            <p class="table-data">{{customers.onlineRegCount}}</p>
            <p class="table-des">电子卡注册数</p>
          </td>
          <td>
            <p class="table-data">{{customers.cardBindCount}}</p>
            <p class="table-des">实体卡绑定数</p>
          </td>
          <td>
            <p class="table-data">{{customers.cardRegCount}}</p>
            <p class="table-des">实体卡注册数</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="table-data">{{customers.supremeRegCount}}</p>
            <p class="table-des">至尊卡注册数</p>
          </td>
          <td>
            <p class="table-data">{{customers.supremeRenewCount}}</p>
            <p class="table-des">至尊卡续费数</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="handle-panel" v-if="userInfo.is_leader_in_dept === '0'">
      <div class="tit">
        <p class="tit-left">
          <span class="tip"></span>
          <span>明星导购榜</span>
        </p>
        <div class="selector-panel">
          <popup-picker :data="stores" v-model="currentStore" @on-change="onStoreChange"></popup-picker>
          <i class="el-icon-arrow-down icon-pos"></i>
        </div>
      </div>
      <ul class="tabs">
        <li v-for = "(item, index) in sortTabs" @click="checkTab(index)" :key="index" :class="{'active':item.ifCheck}">{{item.name}}</li>
      </ul>
      <ul class="assort-list" v-if="rankingList.length">
        <li class="me">
          <div class="left">
            <span class="sort">{{rankingList.current && rankingList.current.ranking}}</span>
            <div class="member-msg">
              <div class="member-img-container">
                <img :src="rankingList.current&&rankingList.current.avatar" alt="">
              </div>
              <span>{{rankingList.current&&rankingList.current.name}}</span>
            </div>
          </div>
          <div v-if="rankingType == 1" class="right">{{rankingList.current&&rankingList.current.addCustomerMark}}</div>
          <div v-if="rankingType == 2" class="right">{{rankingList.current&&rankingList.current.customerRegMark}}</div>
          <div v-if="rankingType == 3" class="right">{{rankingList.current&&rankingList.current.serviceMark}}</div>
        </li>
        <li v-for="(item, index) in rankingList.rankingList" :key="index">
          <div class="left">
            <span class="sort">
              <img v-if="index == 0" src="@/assets/images/first_blood.png" alt="">
              <img v-if="index == 1" src="@/assets/images/dubble_kill.png" alt="">
              <img v-if="index == 2" src="@/assets/images/triple_kill.png" alt="">
              <i v-if="index !== 0 && index !== 1 && index !== 2">{{index + 1}}</i>
            </span>
            <div class="member-msg">
              <div class="member-img-container">
                <img :src="item.avatar" alt="">
              </div>
            </div>
            <span>{{item.name}}</span>
          </div>
          <div v-if="rankingType == 1" class="right">{{item.addCustomerMark}}</div>
          <div v-if="rankingType == 2" class="right">{{item.customerRegMark}}</div>
          <div v-if="rankingType == 3" class="right">{{item.serviceMark}}</div>
        </li>
      </ul>
      <div class="assort-list empty" v-else>
        未查询到排行榜数据
      </div>  
    </div>
    <bottom-bar :type="2"></bottom-bar>
  </div>
</template>
<script>
import BottomBar from "@/components/common/BottomBar"
import { PopupPicker } from "vux"

export default {
  name: 'DataPanel',
  components: {
    PopupPicker,
    BottomBar
  },
  data() {
    return {
      chosenLeader: ['我的门店'],
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      choosenDay: ['昨日'],
      currentStore: ['本店'],
      leaderList: [[ '我的门店']],
      options: [['昨日', '近7天', '近30天', '近3个月']],
      stores: [['本店','片区内门店','相同级别门店']],
      sortTabs: [
        {
          name: '添加顾客排行榜',
          ifCheck: true
        },
        {
          name: '拉新排行榜',
          ifCheck: false
        },
        {
          name: '服务评分排行榜',
          ifCheck: false
        },
      ],
      wxUserid: localStorage.getItem('wxUserid'),
      concatList: {},
      consumeList: {},
      couponList: {},
      customers: {},
      rankingList: {},
      dayType: 1,
      rankingType: 1,
      areaType: 1,
    }
  },
  computed: {
    queryType() {
      let target = '1'
      this.chosenLeader[0] === '我的门店' && this.userInfo.is_leader_in_dept === '1' && (target = '2')
      return target
    }
  },
  mounted() {
    // console.log('dataPanel:', this.userInfo.is_leader_in_dept)
    // this.userInfo.is_leader_in_dept = '1'
    this.leaderList = [[this.userInfo.name, '我的门店']]
    this.getAllData()
  },
  methods: {
    leaderChecker(val) {
      console.log(this.queryType)
      this.getAllData()
    },
    checkTab(index) {
      this.sortTabs.forEach((item, i) => {
        if(index === i){
          item.ifCheck = true
          this.rankingType = (i + 1)
          this.doGetRankingList()
        }else{
          item.ifCheck = false
        }
      }) 
    },
    getAllData() {
      this.$axios.all([this.getConcat(),this.getConsume(),this.getCoupon(),this.newCustomers(),this.getRankingList()]).then(this.$axios.spread((concat, consume, coupon, customers, rankingList) => {
      // this.$axios.all([this.getConcat(),this.getConsume(),this.getCoupon(),this.newCustomers()]).then(this.$axios.spread((concat, consume, coupon, customers) => {
        this.concatList = concat.data
        this.consumeList = consume.data
        this.couponList = coupon.data
        this.customers = customers.data
        this.rankingList = rankingList.data
      }))
    },
    getConcat() {
      return this.$axios.post('/stat/contactBehavior', {
        dayType: this.dayType,
        queryType: this.queryType
      },{
        headers: {
          'x-s-userid': this.wxUserid
        }
      })
    },
    getConsume() {
      return this.$axios.post('/stat/consumeBehavior',{
        dayType: this.dayType,
        queryType: this.queryType
      },{
        headers: {
          'x-s-userid': this.wxUserid
        }
      })
    },
    getCoupon() {
      return this.$axios.post('/stat/couponBehavior',{
        dayType: this.dayType,
        queryType: this.queryType
      },{
        headers: {
          'x-s-userid': this.wxUserid
        }
      })
    },
    newCustomers() {
      return this.$axios.post('/stat/newCustomers',{
        dayType: this.dayType,
        queryType: this.queryType
      },{
        headers: {
          'x-s-userid': this.wxUserid
        }
      })
    },
    getRankingList () {
      return this.$axios.post('/admin/rankingList',{
        dayType: this.dayType,
        areaType: this.areaType,
        rankingType: this.rankingType
      },{
        headers: {
          'x-s-userid': this.wxUserid
        }
      })
    },
    doGetRankingList () {
      this.getRankingList().then(res => this.rankingList = res.data)
    },
    onChange (val) {
      this.options[0].forEach((item, index) => {
        if (item === val[0]) {
          this.dayType = (index + 1)
          this.getAllData()
          return
        }
      })
    },
    onStoreChange (val) {
      this.stores[0].forEach((item, index) => {
        if(item === val[0]) {
          this.areaType = (index + 1)
          this.doGetRankingList()
        }
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.selector-panel
  display flex
  align-items center
.icon-pos
  margin-left 10px
.with-bottom-bar
  margin-bottom 120px
.panel-header
  display flex
  justify-content space-between
  align-items center
  height 88px
  padding 0 30px
  background-color #95ce4e
  color #fff
  .vux-cell-box
    position static
    font-size 26px
  .role-base
    display flex
    align-items center
    line-height 88px
    font-size 28px
    .img-container
      position relative
      display flex
      overflow hidden
      align-items center
      justify-content center
      width 60px
      height 60px
      border-radius 30px
      margin-right 20px
      background-color #fff
      img
        width 100%
        height 100%
.handle-panel
  background-color #fff
  margin-bottom 20px
  padding-left 20px
  padding-right 33px
  padding-bottom 20px
  .tit
    display flex
    justify-content space-between
    align-items center
    height 84px
    border-bottom 1px solid #f2f2f2
    .tit-left
      font-size 28px
      color #1b252e
      display flex
      align-items center
      .tip
        display inline-block
        width 4px
        height 30px
        margin-right 10px
        border-radius: 2px;
        background-image: linear-gradient(45deg, #95ce4e 1%, #8ac83a);
    .tit-right
      .inner-right
        font-size 25px
        margin-left 26px
        color #5c5c5c
  .panel-body
    width 100%
    margin-top 20px
    border-collapse:collapse;
    .table-data
      font-size 32px
      color #1b252e
    .table-des
      font-size 24px
      color #5c5c5c
    td
      width 50%
      height 130px
      vertical-align center
      text-align center
      border 1px solid #f2f2f2
  .panel-body-3
    td
      width 33.333%
.tabs
  display flex
  justify-content space-around
  li
    height 80px
    line-height 80px
    font-size 27px
  .active
    color #8ac83a
.empty
  border-top 1px solid #f2f2f2
  color #d0d0d0
  font-weight 500
  font-size 36px
  text-align center
  padding-top 20px
.assort-list
  .me
    background #f2f2f2
    color #1b252e
  li
    display flex
    justify-content space-between
    align-items center
    height 88px
    padding-left 44px
    padding-right 102px
    border-bottom 1px solid #f2f2f2
    font-size 26px
    color #5c5c5c
    .left
      display flex
      height 100%
      align-items center
      .sort
        display inline-block
        width 24px
        height 33px
        font-size 24px
        margin-right 50px
        img 
          width 100%
          height 100%
      .member-msg
        display flex
        align-items center
        .member-img-container 
          display inline-block
          overflow hidden
          width 50px
          height 50px
          border-radius 50px
          margin-right 20px
          background-color #fff
          img 
            width 100%
            height 100%
</style>


