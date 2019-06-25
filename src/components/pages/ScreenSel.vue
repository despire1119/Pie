<template>
  <div>
    <!-- <ul v-if="withTab && ifAll" class="tabs">
      <li @click="checker(index)" v-for="(item, index) in tagList" :key="index" :class="{'active': item.ifCheck}">{{item.tagName}}</li>
    </ul> -->
    <!-- <div v-if="panelType === 'tag' && ifAll" style="margin-bottom: 20px">
      <table class="data-panel" frame='void'>
        <tr>
          <td>
            <p class="data">{{dataCenter.supremeCount}}</p>
            <p class="tag">VIP</p>
          </td>
          <td>
            <p class="data">{{dataCenter.supremeCount}}</p>
            <p class="tag">至尊会员</p>
          </td>
          <td>
            <p class="data">{{dataCenter.ordinaryCount}}</p>
            <p class="tag">普通会员</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="data">{{dataCenter.nonMemberCount}}</p>
            <p class="tag">非会员</p>
          </td>
          <td>
            <p class="data">{{dataCenter.fans1Count}}</p>
            <p class="tag">粉丝1</p>
          </td>
          <td>
            <p class="data">{{dataCenter.fans2Count}}</p>
            <p class="tag">粉丝2</p>
          </td>
        </tr>
        <tr v-for="(item, index) in customizeList" :key="index"> 
          <td v-for="(inner, i) in item" :key="i">
            <p class="data">{{inner}}</p>
            <p class="tag">{{i}}</p>
          </td>
        </tr>
      </table>
      <table class="data-panel" frame='void'>
        <tr>
          <td>
            <p class="data">{{dataCenter.efPreferenceHCount}}</p>
            <p class="tag">EF偏好(高)</p>
          </td>
          <td>
            <p class="data">{{dataCenter.efPreferenceMCount}}</p>
            <p class="tag">EF偏好(中)</p>
          </td>
          <td>
            <p class="data">{{dataCenter.efPreferenceLCount}}</p>
            <p class="tag">EF偏好(低)</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="data">{{dataCenter.bigPreferenceHCount}}</p>
            <p class="tag">大促偏好(高)</p>
          </td>
          <td>
            <p class="data">{{dataCenter.bigPreferenceMCount}}</p>
            <p class="tag">大促偏好(中)</p>
          </td>
          <td>
            <p class="data">{{dataCenter.bigPreferenceLCount}}</p>
            <p class="tag">大促偏好(低)</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="data">{{dataCenter.specialPreferenceHCount}}</p>
            <p class="tag">特价偏好(高)</p>
          </td>
          <td>
            <p class="data">{{dataCenter.specialPreferenceMCount}}</p>
            <p class="tag">特价偏好(中)</p>
          </td>
          <td>
            <p class="data">{{dataCenter.specialPreferenceLCount}}</p>
            <p class="tag">特价偏好(低)</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="data">{{dataCenter.passengerAbilityHCount}}</p>
            <p class="tag">超高客单</p>
          </td>
          <td>
            <p class="data">{{dataCenter.passengerAbilityHCount}}</p>
            <p class="tag">高客单</p>
          </td>
          <td>
            <p class="data">{{dataCenter.passengerAbilityMCount}}</p>
            <p class="tag">中客单</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="data">{{dataCenter.passengerAbilityLCount}}</p>
            <p class="tag">低客单</p>
          </td>
          <td>
            <p class="data">{{dataCenter.rfmHCount}}</p>
            <p class="tag">高频率</p>
          </td>
          <td>
            <p class="data">{{dataCenter.rfmMCount}}</p>
            <p class="tag">中频率</p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="data">{{dataCenter.rfmLCount}}</p>
            <p class="tag">低频率</p>
          </td>
          <td>
            <p class="data">{{dataCenter.chineseMedicineCount}}</p>
            <p class="tag">中药</p>
          </td>
          <td>
            <p class="data">{{dataCenter.ginsengCount}}</p>
            <p class="tag">茸参</p>
          </td>
        </tr>
      </table>
    </div> -->
    <div v-if="panelType === 'list' || !ifAll">
      <div class="screen" @click="selectorShow">
        <div class="screen-btn">
          <img src="@/assets/images/tags.png" alt="">
        </div>
        <span>顾客筛选</span>
      </div>
      <screen-panel v-if="screenShow"></screen-panel>
      <customer-list v-if="!screenShow" :ifHandle=type></customer-list>
    </div>
    
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import CustomerList from '@/components/common/CustomerList'
import ScreenPanel from '@/components/common/ScreenPanel'

export default {
  props: ['type'],
  name: 'ScreenSel',
  data() {
    return {
      wxUserid: localStorage.getItem('wxUserid'),
      withTab: true,
      ifAll: this.$route.query.ifAll,
      // panelType: 'tag',
      tagList: [
        {
          tagName: '顾客标签',
          panelType: 'tag',
          ifCheck: false
        },{
          tagName: '顾客列表',
          panelType: 'list',
          ifCheck: true
        }
      ],
      dataCenter: {}
    }
  },
  components: {
    CustomerList,
    ScreenPanel
  },
  mounted() {
    // document.title = this.switcher[this.type]

    if(this.ifAll){
      document.title = '全部顾客'
      this.$axios.post('/admin/userTagCountStat', {}, {
        headers: {
          'x-s-userid': this.wxUserid
        }
      }).then(res => {
        this.dataCenter = res.data
        console.log(this.customizeList)
      })
    }else{
      document.title = `顾客列表·${this.$route.query.dayType}`
    }
  },
  methods: {
    checker(index) {
      this.tagList.forEach((item,i) => index === i ? item.ifCheck = true : item.ifCheck = false)
    },
    selectorShow(){
      // this.screenShow = !this.screenShow
      this.$store.commit('normal/changeScreenShow')
    }
  },
  computed: {
    ...mapState({
      screenShow: state => state.normal.screenShow
    }),
    customizeList() {
      const obj = this.dataCenter.tagCountMap
      let target = [], finalList = []
      if(obj){
        for(let i = 0; i < Object.keys(obj).length; i+=3){
          target.push(Object.keys(obj).slice(i, i+3))
        }
      }
      // console.log(Object.keys(obj).slice(0, 3))
      target.forEach((item, index) => {
        let cell = {}
        item.forEach((inner, i) => {
          cell[inner] = obj[inner]
        })
        finalList.push(cell)
      })
      return finalList
    },
    panelType() {
      let c = ''
      this.tagList.forEach((item, index) => {
        item.ifCheck && (c = item.panelType)
      })
      return c
    }
  },
}
</script>

<style lang="stylus" scoped>
.data-panel
  margin-top 20px
  background-color #fff
  width 100%
  border-collapse collapse
  td
    width 33.33333%
    height 130px
    text-align center
    border 1px solid #f2f2f2
    .data
      font-size 32px
      color #1b252e
    .tag
      font-size 24px
      color #5c5c5c
.tabs
  display flex
  height 90px
  align-items center
  justify-content center
  background-color #fff
  li
    display flex
    width 166px
    height 60px
    font-size 26px
    align-items center
    justify-content center
    border 1px solid #e3e3e3
    color #868686
    &:first-child
      border-right 0
      border-top-left-radius 60px
      border-bottom-left-radius 60px
    &:last-child
      border-top-right-radius 60px
      border-bottom-right-radius 60px
  .active
    color #81bb36
    background-color rgba(138,200,58,.4)
    border-color #d4ebb6
.panel
  position relative
.screen
  display flex
  align-items center
  background-color #fff
  margin-top 19px
  padding 0 28px
  .screen-btn
    position relative
    display block
    width 66px
    height 66px
    background-color #dddddd
    margin 12px 28px 12px 0
    font-size 50px
    color #fff
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
  span 
    font-size 30px
</style>
