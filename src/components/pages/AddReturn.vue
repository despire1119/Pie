<template>
  <div>
    <p class="base-input"><span>待办事项：</span><input type="text" v-model="recordReq.reason" placeholder="请填写待办事项"></p>
    <div class="base-input sp-between date-pick">
      <span>提醒时间：</span>
      <div class="time-box">
        <span>{{recordReq.visitTime}}</span>
        <!-- <input v-model="visitTime" @click="toConsole" type="datetime-local"> -->
        <!-- <el-date-picker
          v-model="recordReq.visitTime"
          type="datetime"
          placeholder="选择日期时间"
          size="large"
          :change="toConsole">
        </el-date-picker> -->
        <datetime class="time-hider" v-model="recordReq.visitTime" format="YYYY-MM-DD HH:mm" :hour-list="['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']" :minute-list="['00', '15', '30', '45']" @on-change="toConsole"></datetime>
        <i class="el-icon-arrow-right icon-pos"></i>
      </div>
    </div>
    <p v-if="noChoose" class="base-input sp-between with-top"><span>选择会员：</span><span>{{nameString ? nameString : '请选择'}}</span></p>
    <router-link v-if="!noChoose" :to="{path: '/screen_sel/handle', query: {reason: recordReq.reason}}" tag="p" class="base-input sp-between with-top">
      <span>选择会员：</span>
      <span>
        {{nameString ? nameString : '请选择'}}
        <i class="el-icon-arrow-right icon-pos"></i>
      </span>
    </router-link>
    <div class="btn-area"><button @click="submit">提交</button></div>
    <alert v-model="alertShow" content="请填写待办事项"></alert>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Alert } from 'vux'
import utils from '@/assets/utils'
export default {
  name: 'AddReturn',
  data() {
    return {
      noChoose: this.$route.query.noChoose,
      alertShow: false,
      nameString: '',
      recordReq: {
        userIDs: '',
        reason: this.$route.query.reason || '',
        visitTime: utils.Format(new Date(), 'yyyy-MM-dd hh:mm')
      },
    }
  },
  components: {
    Alert
  },
  mounted() {
    const selected = this.$route.query.req?JSON.parse(this.$route.query.req):null
    console.log(selected)
    let targetList = [], nameList = []
    if(selected){
      selected.forEach(item => {
        targetList = [...targetList, item.userID || item.id]
        nameList = [...nameList, item.name]
      })
      this.recordReq.userIDs = targetList.toString()
      this.nameString = nameList.toString()
      console.log(this.recordReq)
    }
  },
  computed: {
    ...mapState({
      wxUserid: state => state.normal.wxUserid,
    })
  },
  methods: {
    toConsole() {
      console.log(this.visitTime)
    },
    submit() {
      // console.log(this.recordReq)
      if(this.recordReq.reason){
        this.$axios.post('/visitRecord/add',this.recordReq,{
          headers: {
            'x-s-userid': this.wxUserid
          }
        }).then(res => {
          res.data.desc === 'success' ? this.$router.replace('/waiter_list') : alert('提交错误，请重试。')
        })
      }else{
        this.alertShow = true
      }
    }
  },
}
</script>
<style lang="stylus" scoped>
.base-input
  display flex
  align-items center
  background-color #fff
  height 90px
  font-size 28px
  padding 0 32px
  color #4e4e4e
  ::-webkit-input-placeholder
    color #e0e0e0
  input
    font-size 26px
    color #5c5c5c
    outline none
    flex 1
.icon-pos
  margin-left 15px
.sp-between
  justify-content space-between
.with-top
  margin-top 20px
.btn-area
  display flex
  justify-content center
  margin-top 130px
  button
    width 580px
    height 70px
    margin auto
    background-color #95ce4e
    color #fff
    font-size 28px
    border-radius 5px
.time-box
  position relative
.time-hider
  position absolute
  top 0
  bottom 0
  width 300px
  right 20px
  opacity 0
</style>


