<template>
  <div class="waiter">
    <div class="waiter-list">
      <swipeout>
        <swipeout-item v-for="(item, index) in waitList" :key="index">
          <div slot="right-menu">
            <swipeout-button
              class="border-type"
              @click.native="onButtonClick(item.id)"
              type="warn"
            >删除</swipeout-button>
          </div>
          <div slot="content" class="li vux-1px-b">
            <i class="circle" @click="thingComlete(item, 2)"></i>
            <div class="cell-detail">
              <p class="tit">{{item.reason}}</p>
              <p class="customer" v-if="item.name">参与顾客：{{item.name}}</p>
              <p class="remind-time">提醒时间：{{item.visitTime}}</p>
            </div>
            <div class="go-wx" @click="goWeChat(item)" v-if="item.name">
              <img src="@/assets/images/icon_wechat@3x.png" alt>
            </div>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
    <div class="sort-complete">
      <button @click="toggle">
        <span>{{!toHide ? "隐藏" : "显示"}}已完成事项</span>
        <i :class="toHide ? 'el-icon-arrow-down':'el-icon-arrow-up'"></i>
      </button>
    </div>
    <swipeout class="waiter-list" v-if="!toHide">
      <swipeout-item v-for="(item, index) in completeList" :key="index">
        <div slot="right-menu">
          <swipeout-button class="border-type" @click.native="onButtonClick(item.id)" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="li vux-1px-b">
          <i class="icon-green el-icon-check" @click="thingComlete(item, 1)"></i>
          <div class="cell-detail">
            <p class="tit">{{item.reason}}</p>
            <p class="customer" v-if="item.name">参与顾客：{{item.name}}</p>
            <p class="remind-time">提醒时间：{{item.visitTime}}</p>
          </div>
          <div class="go-wx" @click="goWeChat(item)" v-if="item.name">
            <img src="@/assets/images/we_chat.png" alt>
          </div>
        </div>
      </swipeout-item>
    </swipeout>
    <div class="bottom-bar vux-1px-t">
      <router-link tag="i" to="/add_return" class="el-icon-plus"></router-link>
    </div>
  </div>
</template>
<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
import utils from '@/assets/utils'

export default {
  data() {
    return {
      toHide: true,
      wxUserid: localStorage.getItem("wxUserid"),
      allList: [],
      waitList: [],
      completeList: []
    };
  },
  computed: {
    // waitList() {
    //   return this.allList.filter(item => item.status == 1)
    // },
    // completeList() {
    //   return this.allList.filter(item => item.status == 2)
    // }
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  created() {
    utils.registWx()
  },
  mounted() {
    this.getWaiterList(1).then(res => this.waitList = res.data.dataList);
  },
  methods: {
    goWeChat(item) {
      // console.log("????????")
      console.log(item);
      wx.openEnterpriseChat({
        // userIds: 'zhangshan;lisi;wangwu',    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: item.wxUserid, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: "", // 必填，会话名称。单聊时该参数传入空字符串""即可。
        success: function(res) {
          // 回调
          console.log(res);
        },
        fail: function(res) {
          console.log(res);
          if (res.errMsg.indexOf("function not exist") > -1) {
            alert("版本过低请升级");
          }
        }
      });
    },
    onButtonClick(id) {
      this.$axios
        .post(
          "/visitRecord/delete",
          {
            id: id
          },
          {
            headers: {
              "x-s-userid": this.wxUserid
            }
          }
        )
        .then(res => {
          res.data.desc === "success" && this.getWaiterList();
        });
    },
    toggle() {
      this.toHide = !this.toHide;
      !this.toHide && this.getWaiterList(2).then(res => this.completeList = res.data.dataList)
    },
    getWaiterList(type) {
      return this.$axios.post(
        "/visitRecord/list",
        {
          status: type,
          pageNo: 1,
          pageSize: 10000
        },
        {
          headers: {
            "x-s-userid": this.wxUserid
          }
        }
      );
    },
    getAllList() {
      this.$axios.all([this.getWaiterList(1),this.getWaiterList(2)]).then(this.$axios.spread((wait,complete) => {
        this.waitList = wait.data.dataList
        this.completeList = complete.data.dataList
      }))
    },
    thingComlete(item, ifComplete) {
      this.$axios
        .post(
          "/visitRecord/update",
          {
            id: item.id,
            status: ifComplete
          },
          {
            headers: {
              "x-s-userid": this.wxUserid
            }
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.desc === "success") this.getAllList()
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
</style>
<style lang="stylus" scoped>
// .border-type
// border-top 5px solid #f2f2f2
// border-bottom 5px solid #f2f2f2
.waiter
  margin-bottom 164px
.waiter-list
  background-color #fff
  .li
    position relative
    overflow hidden
    display flex
    align-items center
    padding 31px 32px
    box-sizing content-box
    // border-bottom 1px solid #f2f2f2
    .icon-green
      display flex
      justify-content center
      align-items center
      width 40px
      height 40px
      border-width 0
      border-radius 40px
      font-size 26px
      color #fff
      background-color #8ac83a
      margin-right 19px
    .circle
      width 38px
      height 38px
      border-radius 38px
      margin-right 19px
      border 1px solid #5c5c5c
    .tit
      font-size 30px
      color #1b252e
    .customer
      font-size 26px
      color #868686
      margin-top 20px
    .remind-time
      margin-top 21px
      font-size 26px
      color #ff9900
    .go-wx
      position absolute
      top 27px
      right 48px
      width 50px
      img
        width 100%
        height auto
.sort-complete
  display flex
  justify-content center
  padding 39px
  font-size 28px
  button
    display flex
    justify-content center
    align-items center
    width 300px
    height 54px
    border-radius 27px
    color #4aa5fa
    background-color #fff
    font-size 28px
    span
      margin-right 15px
.bottom-bar
  position fixed
  display flex
  justify-content center
  align-items center
  left 0
  right 0
  bottom 0
  height 124px
  padding-bottom constant(safe-area-inset-bottom)
  background-color #fff
  i
    font-size 48px
    color #8ac83a
</style>

