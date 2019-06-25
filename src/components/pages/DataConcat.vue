<template>
  <div>
    <div class="tabs">
      <div class="tabs-contain">
        <span
          @click="check(index)"
          v-for="(item, index) in tabs" 
          :key="index" class="tab tab-right" 
          :class="{'active': item.ifCheck}">{{item.name}}</span>
      </div>
    </div>
    <table class="data-center" align='center'>
      <tr v-if="type == 'concat'">
        <th>成员</th>
        <th>加新</th>
        <th>聊天人数</th>
        <th>已回复</th>
        <th>首聊时长</th>
      </tr>
      <tr v-if="type == 'buy'">
        <th>成员</th>
        <th>活跃率(%)</th>
        <th>客单价(元)</th>
        <th>购物频次(次)</th>
      </tr>
      <tr v-if="type == 'coupen'">
        <th>成员</th>
        <th>发送数量</th>
        <th>使用数量</th>
        <th>券平均客单价</th>
      </tr>
      <tr v-if="type == 'add_new'">
        <th>成员</th>
        <th>电子卡注册数</th>
        <th>实体卡绑定数</th>
        <th>实体卡注册数</th>
      </tr>
      <tr v-show="type === 'concat'" v-for="(item, index) in contactList" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.addCount}}</td>
        <td>{{item.chatCount}}</td>
        <td>{{item.chatReplyRatio}}</td>
        <td>{{item.avgReplyDuration}}</td>
      </tr>
      <tr v-show="type === 'buy'" v-for="(item, index) in consumeList" :key="index">      
        <td>{{item.name}}</td>
        <td>{{item.activityRate}}</td>
        <td>{{item.customerUnitPrice}}</td>
        <td>{{item.buyCount}}</td>
      </tr>
      <tr v-show="type == 'coupen'" v-for="(item, index) in couponList" :key="index">      
        <td>{{item.name}}</td>
        <td>{{item.sendCount}}</td>
        <td>{{item.useCount}}</td>
        <td>{{item.avgUnitPrice}}</td>
      </tr>
      <tr v-show="type == 'add_new'" v-for="(item, index) in newCustomerDetail" :key="index">      
        <td>{{item.name}}</td>
        <td>{{item.onlineRegCount}}</td>
        <td>{{item.cardBindCount}}</td>
        <td>{{item.cardRegCount}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ['type'],
  name: 'DataConcat',
  data() {
    return {
      switcher: {
        concat: '顾客联系行为统计',
        buy: '消费行为统计',
        coupen: '优惠券统计',
        add_new: '新会员办卡及绑卡统计'
      },
      tabs: [
        {
          name: '今日',
          ifCheck: true
        },
        {
          name: '近7天',
          ifCheck: false
        },
        {
          name: '近30天',
          ifCheck: false
        }
      ],
      wxUserid: localStorage.getItem('wxUserid'),
      contactList: [],
      consumeList: [],
      couponList: [],
      newCustomerDetail: []
    }
  },
  mounted() {
    // console.log(this.type)
    // document.title = this.switcher[this.type]
    switch (this.type) {
      case 'concat':
        this.getInfo('/stat/contactBehaviorDetail',data => {
          console.log(data)
          this.contactList = data.dataList
        })
        break;
      case 'buy':
        this.getInfo('/stat/consumeBehaviorDetail', data => {
          console.log(data)
          this.consumeList = data.dataList
        })
        break;
      case 'coupen':
        this.getInfo('/stat/couponBehaviorDetail', data =>{
          this.couponList = data.dataList
        })
        break;
      case 'add_new':
        this.getInfo('/stat/newCustomersDetail', data => {
          this.newCustomerDetail = data.dataList
        })
      default:
        break;
    }
  },
  methods: {
    check(i) {
      this.tabs.forEach((item,index) => {
        if(i === index) {
          item.ifCheck = true
          i === 0 && (document.title = '全部顾客')
          i === 1 && (document.title = '顾客列表')
        }else{
         item.ifCheck = false
        }
      })
    },
    getInfo(url,callback) {
      this.$axios.post(url,{
        pageNo: 1,
        pageSize: 100000
      },{
        headers: {
          'x-s-userid': this.wxUserid
        }
      }).then(res => {
        callback(res.data)
      })
    }
  },
}
</script>
<style lang="stylus" scoped>
.tabs
  display flex
  justify-content center
  align-items center
  background-color #fff
  padding 15px 0
  .tabs-contain
    border 1px solid #e3e3e3
    border-radius 30px
    overflow hidden
    margin auto
    .tab
      display inline-block
      width 146px
      height 60px
      text-align center
      line-height 60px
      color #868686
    .active
      background-color #d4ebb6
      color #81bb36
    .tab-left
      border-left 1px solid #e3e3e3
    .tab-right
      border-right 1px solid #e3e3e3
.data-center
  width 100%
  border-collapse:collapse;
  th
    font-weight 1
    font-style normal
    padding 24px 0
    font-size 24px
    color #868686
  td
    font-size 28px
    padding 34px 0
    background-color #fff
    text-align center
    border-bottom 1px solid #eef0f3
</style>


