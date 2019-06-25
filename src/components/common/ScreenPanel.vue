<template>
  <div>
    <div class="sel-panel">
      <div class="grades">
        <p class="tit">会员等级</p>
        <ul class="selectors">
          <li
            v-for="(teir, index) in teirsJson" 
            @click="chooseTag('teirs',index)"
            :class="{'active':teir.ifCheck}" 
            :key="index">
            {{teir.name}}
          </li>
          <!-- <li>vip</li>
          <li>至尊会员</li>
          <li></li> -->
        </ul>
      </div>
      <div class="grades">
        <p class="tit">系统标签</p>
        <ul class="selectors">
          <li 
            v-for="(teir, index) in systemJson"
            @click="chooseTag('system',index)"
            :class="{'active':teir.ifCheck}" 
            :key="index">
            {{teir.name}}
          </li>
        </ul>
      </div>
      <div class="grades">
        <p class="tit">自定义标签</p>
        <ul class="selectors">
          <li class="active">vip</li>
        </ul>
      </div>
    </div>
    <div class="btns">
      <button @click="backToList" class="cancel">清除</button>
      <button @click="backToList" class="confirm">确定</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ScreenPanel',
  data() {
    return {
      systemJson: [
        {
          name: 'EF偏好(高)',
          target: 'EF',
          ifCheck: false,
        },
        {
          name: 'EF偏好(中)',
          target: 'EF',
          ifCheck: false,
        },
        {
          name: 'EF偏好(低)',
          target: 'EF',
          ifCheck: false,
        },
        {
          name: '大促偏好(高)',
          target: 'Sec',
          ifCheck: false,
        },
        {
          name: '大促偏好(中)',
          target: 'Sec',
          ifCheck: false,
        },
        {
          name: '大促偏好(低)',
          target: 'Sec',
          ifCheck: false,
        },
        {
          name: '特价偏好(高)',
          target: 'Spe',
          ifCheck: false,
        },
        {
          name: '特价偏好(中)',
          target: 'Spe',
          ifCheck: false,
        },
        {
          name: '特价偏好(低)',
          target: 'Spe',
          ifCheck: false,
        },
        {
          name: '高客单',
          target: 'Cus',
          ifCheck: false,
        },
        {
          name: '中客单',
          target: 'Cus',
          ifCheck: false,
        },
        {
          name: '低客单',
          target: 'Cus',
          ifCheck: false,
        },
        {
          name: '高频率',
          target: '',
          ifCheck: false,
        },
        {
          name: '中频率',
          target: '',
          ifCheck: false,
        },
        {
          name: '低频率',
          target: '',
          ifCheck: false,
        },{
          name: '中药',
          target: 'chinese',
          ifCheck: false,
        },{
          name: '参茸',
          target: 'ginseng',
          ifCheck: false,
        },
      ],
      teirsJson: [
        {
          name: 'VIP',
          ifCheck: false,
        },
        {
          name: '至尊会员',
          ifCheck: false,
        },
        {
          name: '普通会员',
          ifCheck: false,
        },
        {
          name: '非会员',
          ifCheck: false,
        },
        {
          name: '粉丝1',
          ifCheck: false,
        },
        {
          name: '粉丝2',
          ifCheck: false,
        },
      ]
    }
  },
  methods: {
    backToList(){
      this.$store.commit('normal/changeScreenShow')
    },
    chooseTag(type,index){
      switch (type) {
        case 'teirs':
          this.teirsJson[index].ifCheck = !this.teirsJson[index].ifCheck
          break;
        case 'system':
          this.systemJson[index].ifCheck = !this.systemJson[index].ifCheck
          break;
        default:
          break;
      }
    }
  },
  computed: {
    ...mapState({
      screenShow: state => state.screenShow
    })
  },
}
</script>

<style lang="stylus" scoped>
.sel-panel
  margin-bottom 88px
.grades
  background-color #fff
  border-top 1px solid #eef0f3
  .tit
    padding-left 30px
    margin-top 27px
    font-size 30px
.selectors
  display flex
  flex-wrap wrap
  // margin-top 30px
  padding-bottom 40px
  li
    color #1b252e
    font-size 26px
    display flex
    min-width 179px
    height 56px
    justify-content center
    align-items center
    margin 30px 35px 0
    padding 0 5px
    border 1px solid #e3e3e3
    border-radius 5px
    text-align center
  .active
    background-color #d4ebb6
    border-color #d4ebb6
    color #81bb36
.btns
  position fixed
  display flex
  bottom 0
  left 0
  right 0
  height 88px
  button
    flex 1
    height 100%
    font-size 28px
  .cancel
    background-color #fff
    color #1b252e
  .confirm
    background-color #8ac83a
    color #fff
</style>

