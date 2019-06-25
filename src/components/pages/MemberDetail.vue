<template>
  <div>
    <div class="rel-box">
      <div class="member-panel">
        <div class="avator">
          <div class="avator-container">
            <img :src="userInfo.avatar" alt>
          </div>
          <p>{{userInfo.points || 0}}</p>
          <p>可用积分</p>
        </div>
        <div class="detail">
          <p class="name">
            <span>{{userInfo.name}}</span>
            <span v-if="userInfo.tier" class="slogan">{{userInfo.tier}}</span>
          </p>
          <div class="tags-panel">
            <span
              v-if="userInfo.bigPreference && userInfo.bigPreference !== 'null'"
            >{{userInfo.bigPreference}}</span>
            <span
              v-if="userInfo.memberDayPreference && userInfo.memberDayPreference !== 'null'"
            >{{userInfo.memberDayPreference}}</span>
            <span
              v-if="userInfo.efPreference && userInfo.efPreference !== 'null'"
            >{{userInfo.efPreference}}</span>
            <span
              v-if="userInfo.chineseMedicine && userInfo.chineseMedicine !== 'null'"
            >{{userInfo.chineseMedicine}}</span>
            <span v-if="userInfo.ginseng && userInfo.ginseng !== 'null'">{{userInfo.ginseng}}</span>
            <span v-if="userInfo.age_tag && userInfo.age_tag !== 'null'">{{userInfo.age_tag}}</span>
            <span
              v-if="userInfo.marriage_tag && userInfo.marriage_tag !== 'null'"
            >{{userInfo.marriage_tag}}</span>
            <span
              v-if="userInfo.temperament_tag && userInfo.temperament_tag !== 'null'"
            >脾气{{userInfo.temperament_tag}}</span>
            <span
              v-if="userInfo.distance_tag && userInfo.distance_tag !== 'null'"
            >{{userInfo.distance_tag}}</span>
            <span
              v-if="userInfo.income_tag && userInfo.income_tag !== 'null'"
            >收入({{userInfo.income_tag}})</span>
            <span
              v-if="userInfo.education_tag && userInfo.education_tag !== 'null'"
            >{{userInfo.education_tag}}</span>
            <span
              v-if="userInfo.profession_tag && userInfo.profession_tag !== 'null'"
            >{{userInfo.profession_tag}}</span>
            <span
              v-if="userInfo.effect_tag && userInfo.effect_tag !== 'null'"
            >社区影响力({{userInfo.effect_tag}})</span>
            <span
              v-if="userInfo.communicate_tag && userInfo.communicate_tag !== 'null'"
            >{{userInfo.communicate_tag}}</span>
            <span
              v-if="userInfo.healthcare_tag && userInfo.healthcare_tag !== 'null'"
            >{{userInfo.healthcare_tag}}</span>
            <span
              v-if="userInfo.family_tag && userInfo.family_tag !== 'null'"
            >{{userInfo.family_tag}}</span>
          </div>
        </div>
        <router-link
          v-if="ifFace !== 'face'"
          tag="button"
          :to="{path:'/add_tag',query:{unionid:userInfo.unionid, tags: JSON.stringify(userInfo)}}"
          class="add-tag"
        >+添加标签</router-link>
      </div>
      <div class="member-header">
        <p class="tab-des">
          <i class="el-icon-coin"></i>
          <span>近半年消费记录</span>
        </p>
        <ul class="tabs">
          <li
            v-for="(item, index) in tabs"
            :key="index"
            :class="{'active':item.ifCheck}"
            @click="dateCheck(index)"
          >{{item.target}}</li>
        </ul>
      </div>
    </div>
    <ul class="data-list" v-if="consume.length">
      <li class="parent-cell" v-for="(item, index) in consume" :key="index">
        <div class="time">{{item.pricngDt}}</div>
        <ul class="drags">
          <li class="drags-cell">{{item.productName}} * {{item.num}}</li>
          <!-- <li class="drags-cell">华佗再造丸(广州白云山奇星) * 3</li>
          <li class="drags-cell">华佗再造丸(广州白云山奇星) * 3</li>-->
        </ul>
      </li>
    </ul>
    <ul class="data-list" v-else>
      <li class="parent-cell empty">暂无消费记录</li>
    </ul>
    <section class="data-panel">
      <p class="tit">
        <i class="el-icon-money"></i>
        <span>优惠券</span>
      </p>
      <ul class="msg-list">
        <li v-for="(item, index) in coupens" :key="index">
          {{item.productName}}优惠券，还有
          <i>{{item.remainDayNum || 0}}天</i>即将过期。
        </li>
      </ul>
    </section>
    <section class="data-panel">
      <p class="tit">
        <i class="el-icon-bell"></i>
        <span>用药提醒</span>
      </p>
      <ul class="msg-list" v-if="reminderList.length">
        <li class="drag-detail-list" v-for="(item, index) in reminderList" :key="index">
          <div class="drag-detail">
            <p class="name">{{item.productName}} {{item.produtSpecifica}} * {{item.num}}</p>
            <p class="date">
              <span>用完日期：</span>
              <span>{{item.usedateoff}}</span>
            </p>
          </div>
          <div class="time-long">
            剩余：
            <i>{{item.remainDayNum || 0}} 天</i>
          </div>
        </li>
      </ul>
      <ul class="msg-list" v-else>
        <li class="drag-detail-list empty">暂无用药提醒</li>
      </ul>
    </section>
    <section class="data-panel" v-if="false">
      <p class="tit">
        <i class="el-icon-edit-outline"></i>
        <span>营销建议</span>
      </p>
      <ul class="msg-list">
        <li>慢病关注</li>
        <li>分享高血压相关文章</li>
        <li>分享高血压相关品券</li>
      </ul>
    </section>
    <section class="data-panel" v-if="false">
      <p class="tit">
        <i class="el-icon-collection-tag"></i>
        <span>猜你喜欢</span>
      </p>
      <ul class="guess-you">
        <li>
          <div class="img-container">
            <img src="@/assets/images/drag_img.png" alt>
          </div>
          <p>丹心保养茶</p>
        </li>
        <li>
          <div class="img-container">
            <img src="@/assets/images/drag_img.png" alt>
          </div>
          <p>丹心保养茶</p>
        </li>
        <li>
          <div class="img-container">
            <img src="@/assets/images/drag_img.png" alt>
          </div>
          <p>丹心保养茶</p>
        </li>
        <li>
          <div class="img-container">
            <img src="@/assets/images/drag_img.png" alt>
          </div>
          <p>丹心保养茶</p>
        </li>
        <li>
          <div class="img-container">
            <img src="@/assets/images/drag_img.png" alt>
          </div>
          <p>丹心保养茶</p>
        </li>
      </ul>
    </section>
    <div class="btn-bottom" v-if="ifFace === 'face'">
      <button @click="unBind">解绑人脸识别</button>
    </div>
    <div class="btn-bottom" v-else>
      <router-link
        v-if="ifFace != 'face'"
        tag="button"
        :to="{path:'/add_return', query: {req:JSON.stringify([userInfo]),noChoose:1}}"
        class="group"
      >添加待办</router-link>
      <button class="group" @click="goWeChat">联系TA</button>
    </div>
  </div>
</template>
<script>
import utils from "@/assets/utils";
export default {
  name: "MemberDetail",
  data() {
    return {
      currentWxUserid: '',
      checkType: 1,
      getDays: utils.getDays,
      tabs: [
        {
          target: "上一次",
          ifCheck: true
        },
        {
          target: "近三个月",
          ifCheck: false
        },
        {
          target: "近半年",
          ifCheck: false
        }
      ],
      req: {
        unionid: ''
      },
      wxUserid: localStorage.getItem("wxUserid") || '',
      userInfo: {},
      coupens: [],
      consume: [],
      reminderList: [],
      tagList: [],
      ifFace: ""
    };
  },
  created() {
    utils.registWx();
  },
  mounted() {
    // this.getAllData()
    // console.log(utils)
    let code = this.$route.query.code;
    if (code && code != localStorage.getItem("code")) {
      //准备获取用户身份
      console.log("正常登录");
      localStorage.setItem("code", code);
      this.$axios
        .post(
          "/admin/getByCode",
          {
            code: code
          },
          {
            headers: {
              "x-s-userid": localStorage.getItem("wxUserid") || ""
            }
          }
        )
        .then(res => {
          // alert(this.$route.query.code)
          // alert(JSON.stringify(res.data.resultCode))
          console.log("调用接口");
          if (res.data.resultCode == "000000") {
            this.userInfo = res.data.admin;
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
            localStorage.setItem("wxUserid", this.userInfo.wxUserid);
            this.$store.commit("normal/updateUserId", this.userInfo.wxUserid);
            this.wxUserid = localStorage.getItem('wxUserid')
            this.getUnionId()
            // this.$router.push({
            //   path: "/"
            // });
          } else {
            localStorage.clear();
            this.$router.replace({
              path: "/error"
            });
          }
        });
    } else {
      console.log("已登录");

      if (localStorage.getItem("userInfo")) {
        //这里需要调用微信签名
        // this.asignWx();
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.getUnionId()
      } else {
        this.$router.replace({
          path: "/error"
        });
      }
    }
  },
  methods: {
    getUnionId() {
      this.ifFace = this.$route.query.from || "";
      console.log(this.ifFace)
      switch (this.ifFace) {
        case 'qywx':
          wx.ready(() => {
            const reqUrl = location.href.split("#")[0];
            this.$axios.post('/wx/getSignature',{
              url: reqUrl,
              type: 2
            }).then(result => {
              wx.agentConfig({
                corpid: result.data.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
                agentid: result.data.agentid, // 必填，企业微信的应用id
                timestamp: result.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                signature: result.data.signature,// 必填，签名，见附录1
                jsApiList: ['getCurExternalContact'], //必填
                success: r => {
                  // alert(JSON.stringify(r.errMsg))
                  wx.invoke("getCurExternalContact", {}, res => {
                    // alert(res.err_msg)
                    if (res.err_msg == "getCurExternalContact:ok") {
                      // alert(this.req.unionid)
                      this.$axios.post('/user/getByWXUserid',{
                        wxUserid: res.userId
                      },{
                        headers: {
                          "x-s-userid": this.wxUserid
                        }
                      }).then(id => {
                        this.req.unionid = id.data.adminUserRelation.unionid
                        // alert(this.req.unionid)
                        this.getAllData()
                      })
                    } else {
                      //错误处理
                      // alert(res.err_msg)
                    }
                  });
                },
                fail: res => {
                  // alert(res.errMsg)
                }
              })
            })
            
          })
          break;
        default:
          this.req.unionid = this.$route.query.unionid
          this.getAllData()
          break;
      }
    },
    getAllData() {
      //标签
      this.$axios
        .post(
          "/userTag/list",
          {
            ...this.req
          },
          {
            headers: {
              "x-s-userid": this.wxUserid
            }
          }
        )
        .then(res => {
          this.tagList = res.data.dataList;
        });
      //用户详细信息
      this.$axios
        .all([
          this.getUserInfo(),
          this.getCoupens(),
          this.getConsumeList(),
          this.reminder()
        ])
        .then(
          this.$axios.spread((userInfo, coupens, consume, reminder) => {
            this.coupens = coupens.data.dataList;
            this.consume = consume.data.dataList;
            this.reminderList = reminder.data.dataList;
            this.userInfo = userInfo.data.user;
          })
        );
    },
    goWeChat() {
      wx.openEnterpriseChat({
        // userIds: 'zhangshan;lisi;wangwu',    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: this.userInfo.wxUserid, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: "", // 必填，会话名称。单聊时该参数传入空字符串""即可。
        success: function(res) {
          // 回调
          console.log(res);
          // alert(this.userInfo.wxUserid)
        },
        fail: function(res) {
          console.log(res);
          if (res.errMsg.indexOf("function not exist") > -1) {
            alert("版本过低请升级");
          }
        }
      });
    },
    unBind() {
      this.$axios
        .post(
          "/user/unBindFace",
          {
            unionid: this.$route.query.unionid
          },
          {
            headers: {
              "x-s-userid": this.wxUserid
            }
          }
        )
        .then(res => {
          console.log(res);
        });
    },
    dateCheck(i) {
      this.tabs.forEach((item, index) => {
        if (i === index) {
          item.ifCheck = true;
          this.checkType = index + 1;
          this.getConsumeList().then(res => {
            this.consume = res.data.dataList;
          });
        } else {
          item.ifCheck = false;
        }
      });
    },
    getUserInfo() {
      return this.$axios.post("/user/detail", this.req, {
        headers: {
          "x-s-userid": this.wxUserid
        }
      });
    },
    getCoupens() {
      return this.$axios.post("/voucher/list", this.req, {
        headers: {
          "x-s-userid": this.wxUserid
        }
      });
    },
    getConsumeList() {
      return this.$axios.post(
        "/order/list",
        {
          dayType: this.checkType,
          ...this.req
        },
        {
          headers: {
            "x-s-userid": this.wxUserid
          }
        }
      );
    },
    reminder() {
      return this.$axios.post("/medical/list", this.req, {
        headers: {
          "x-s-userid": this.wxUserid
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.rel-box
  margin-top 42px
.member-header
  position relative
  z-index 1
  // margin-top 250px
  padding-top 126px
  margin-top -126px
  background-color #fff
  .tab-des
    padding 26px 0 26px 30px
    font-size 28px
    color #5c5c5c
    i
      margin-right 22px
  .tabs
    display flex
    align-items center
    justify-content space-around
    height 68px
    font-size 26px
    li
      height 100%
      line-height 68px
      border-bottom-width 2px
      border-bottom-style solid
      border-bottom-color transparent
    .active
      color #8bc93c
      border-bottom-color #95ce4e
.member-panel
  z-index 2
  position relative
  display flex
  align-items flex-start
  width 690px
  min-height 306px
  // max-height 330px
  border-radius 8px
  overflow hidden
  // top -220px
  // left 50%
  // margin-left -345px
  margin auto
  background-color #95ce4e
  padding-top 35px
  padding-left 20px
  color #fff
  box-shadow -1.6px 1.2px 14px 0 rgba(0, 0, 0, 0.18)
  .add-tag
    position absolute
    top 48px
    right 0
    padding 13px 13px 12px
    font-size 22px
    background-color #fff
    border-top-left-radius 46px
    border-bottom-left-radius 46px
    color #ff9900
    box-shadow -1.6px 1.2px 14px 0 rgba(0, 0, 0, 0.18)
  .avator
    display flex
    flex-direction column
    align-items center
    font-size 28px
    .avator-container
      display inline-block
      width 100px
      height 100px
      border-radius 50px
      margin-bottom 20px
      background-color #ddd
      overflow hidden
      img
        width 100%
        height 100%
  .detail
    flex 1
    margin-left 20px
    font-size 28px
  .name
    display flex
    align-items center
  .slogan
    border-radius 5px
    padding 4px 14px
    font-size 20px
    margin-left 20px
    background-color #669933
  .tags-panel
    margin-top 50px
    span
      display inline-block
      margin-right 20px
      margin-bottom 20px
      border-radius 40px
      font-size 24px
      padding 8px 16px
      background-color #f9ebc6
      color #663300
.data-list
  background-color #f8f8f8
  color #5c5c5c
  margin-bottom 30px
  li
    font-size 26px
  .parent-cell
    display flex
    justify-content flex-start
    padding 30px
    border-bottom 1px solid #eef0f3
    .time
      margin-right 50px
    .drags
      flex 1
  .empty
    justify-content center
    font-size 28px
    font-weight bold
    color #d0d0d0
.data-panel
  margin-bottom 30px
  background-color #f8f8f8
  color #5c5c5c
  .tit
    display flex
    align-items center
    background-color #fff
    height 80px
    font-size 28px
    padding-left 27px
    i
      margin-top 4px
      margin-right 22px
  .msg-list
    li
      padding 30px
      border-bottom 1px solid #eef0f3
      font-size 26px
      i
        color #ff3300
    .empty
      text-align center
      font-size 28px
      justify-content center
      font-weight bold
      color #d0d0d0
.drag-detail
  flex 1
.drag-detail-list
  display flex
  justify-content space-between
  font-size 26px
  // margin-bottom 30px
  margin-bottom 165px
.guess-you
  display flex
  flex-wrap wrap
  justify-content flex-start
  padding 25px
  margin-bottom 165px
  li
    display flex
    flex-direction column
    align-items center
    margin 0 15px
    margin-bottom 30px
    font-size 26px
    .img-container
      display flex
      align-items center
      justify-content center
      width 200px
      height 156px
      margin-bottom 20px
      background-color #f2f2f2
      img
        width 150px
        height auto
.btn-bottom
  display flex
  justify-content center
  align-items center
  position fixed
  bottom 0
  left 0
  right 0
  height 124px
  background-color #fff
  button
    width 580px
    height 70px
    background-color #95ce4e
    color #fff
    border-radius 6px
  .group
    font-size 28px
    width 260px
    margin 0 30px
</style>
