<template>
  <div>
    <ul class="customer-list">
      <li v-for="(item, index) in customerList" :key="index">
        <div v-if="ifHandle === 'handle'" class="normal-check" @click="ifChoose(index)" :class="!item.ifChecked ? 'checker' : 'checked'">
          <i v-if="item.ifChecked" class="el-icon-check checkIcon" style="color: #fff;"></i>
        </div>
        <div class="avator" @click="goDetail(item.unionid)">
          <img :src="item.avatar" alt="">
        </div>
        <div class="cus-list" @click="goDetail(item.unionid)">
          <div class="fst-line">
            <p>
              <span class="name">{{item.name}}</span>
              <span class="sex">{{item.gender == 1 ? '男' : '女'}}</span>
              <span class="grades">{{item.tier}}</span>
            </p>
            <span class="txt-bottom" v-if="ifEnterShow">{{item.createTime}}</span>
          </div>
          <div class="tips">
            <span v-if="item.ginseng && item.ginseng !== 'null'">{{item.ginseng}}</span>
            <span v-if="item.efPreference && item.efPreference !== 'null'">{{item.efPreference}}</span>
            <span v-if="item.chineseMedicine && item.chineseMedicine !== 'null'">{{item.chineseMedicine}}</span>
          </div>
        </div>
        <div class="btns" v-if="!ifEnterShow">
          <div class="img-contain" @click="addVip(item)">
            <img :src="item.vip == 1 ?require('@/assets/images/ic_follow_sel@2x.png'):require('@/assets/images/ic_follow_nor@2x.png')" alt="" class="collect">
          </div>
          <div class="img-contain img-we-chat" @click="openChat(item)">
            <img src="@/assets/images/icon_wechat@3x.png" alt="" class="msg">
          </div>
        </div>
      </li>
    </ul>
    <div class="btn-area" v-if="!ifEnterShow">
      <button @click="toReturnOrConfirm" class="return-btn">{{ifHandle === 'handle' ?  "确定" : "添加待办"}}</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex' 
import utils from '@/assets/utils'
export default {
  name: 'CustomerList',
  props: {
    ifHandle: '',
  },
  data() {
    return {
      // ifChecked: false,
      ifEnterShow: (this.$route.path).indexOf('enter_shop') > -1,
      wxUserid: localStorage.getItem('wxUserid'),
      listQuery: {
        dayType: '', //今天，近七天，近30天， 近3月，本年
        vip: '',
        tiers: '',  //会员等级
        bigPreference: '',  //大促偏好
        memberDayPreference: '', //会员日偏好
        efPreference: '',  //EF偏好
        chineseMedicine: '',  //中药
        specialPreference: '',  //特价偏好
        ginseng: '',  //参茸
        PassengerAbility: '', //高客单
        pageNo: 1,
        pageSize: 100000
      },
      customerList: []
    }
  },
  components: {
  },
  computed: {
  },
  created() {
    utils.registWx()
  },
  mounted() {
    this.ifEnterShow ? this.getEnterShow() : this.getInfo()
    
  },
  methods: {
    openChat(item) {
      // console.log(item)
      // console.log(wx.openEnterpriseChat)
      wx.openEnterpriseChat({
        // userIds: item.wxUserid,    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: item.wxUserid, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: '',  // 必填，会话名称。单聊时该参数传入空字符串""即可。
        success: function(res) {
            // 回调
            // alert(item.wxUserid)
        },
        fail: function(res) {
          // alert(JSON.stringify(res))
          if(res.errMsg.indexOf('function not exist') > -1){
              alert('版本过低请升级')
          }
        }
      })
    },
    getEnterShow() {
      this.$axios.post('/faceRecord/list',null,{
        headers: {
          'x-s-userid': this.wxUserid
        }
      }).then(res => {
        console.log(res)
        this.customerList = res.data.dataList
      })
    },
    getInfo() {
      this.$axios.post('/user/listByAdmin',this.listQuery,{
        headers: {
          'x-s-userid': this.wxUserid
        }
      }).then(res => {
        this.customerList = res.data.dataList
        console.log(this.customerList)
      })
    },
    addVip(item) {
      this.$axios.post('/user/updateRelation',{
        relationID: item.id,
        vip: item.vip?0:1,
        remark: item.remark
      },{
        headers: {
          'x-s-userid': this.wxUserid
        }
      }).then(res => {
        res.data.desc === 'success' && this.getInfo()
      })
    },
    goDetail(id) {
      let query = {unionid: id}
      this.ifEnterShow && (query['from'] = 'face')
      if(this.ifHandle !== 'handle'){
        this.$router.push({
          path: '/member_detail',
          query: query
        })
      }
      
    },
    toReturnOrConfirm() {
      if(this.ifHandle === 'handle'){
        const req = {req: JSON.stringify(this.customerList.filter(i => i.ifChecked))}
        this.$router.push({
          path: '/add_return',
          query: {
            ...this.$route.query,
            ...req
          }
        })
      }else{
        this.$router.replace('/add_return')
      }
    },
    ifChoose(index){
      let c = this.customerList
      c[index]['ifChecked'] = !c[index]['ifChecked']
      this.customerList = JSON.parse(JSON.stringify(c))
    }
  }
}
</script>
<style lang="stylus" scoped>
.customer-list
  margin-bottom 154px
  li
    display flex
    justify-content space-between
    position relative
    height 160px
    display flex
    margin-top 20px
    background-color #fff
    align-items center
    padding-left 20px
    .normal-check
      position relative
      display flex
      justify-content center
      align-items center
      margin-top 5px
      width: 30px;
      height: 30px;
      border: 1px solid #9c9c9c;
      border-radius: 15px;
      margin-right 20px
      .check-icon
        margin auto
    .checked
      border: 0
      background-color #8ac83a
    .inner-checker
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      width 30px
      height 30px
      // -webkit-appearance none
      outline none
      opacity 0
    .avator
      display block
      overflow hidden
      width 88px
      height 88px
      border-radius 44px
      background-color #dddddd
      img 
        width 100%
        height 100%
    .cus-list
      flex 1
      margin-left 30px
      color #1b252e
      .fst-line
        display flex
        justify-content space-between
        align-items bottom
        padding-right 30px
        font-size 23px
        color #5c5c5c
        .txt-bottom
          line-height 38px
      span
        margin-right 20px
      .name
        font-size 28px
      .sex, .grades
        font-size 24px
        color #5c5c5c
    .tips
      display flex
      margin-top 20px
      height 40px
      span
        border-radius 5px
        background-color #8fd2ff
        font-size 24px
        color #ffffff
        padding 8px 15px
    .btns
      position absolute
      right 30px
      top 25px
      display flex
      height 40px
      // margin-right 24px
      .img-contain
        display flex
        justify-content center
        align-content center
        position relative
        width 41px
        height auto
        margin-left 20px
        img
          position absolute
          top 0
          left 0
          width 100%
          height auto
      .img-we-chat
        width 50px
        margin-left 26px
        margin-top -5px
.btn-area
  position fixed
  left 0
  right 0
  bottom 0
  background-color #fff
  display flex
  justify-content center
  align-items center
  height 124px
  .return-btn
    width 580px
    height 70px
    color #fff
    font-size 28px
    background-color #8ac83a
    border-radius 5px
</style>

