<template>
  <div class="with-bottom">
    <div class="tag-panel">
      <p class="tag-name" @click="centerControl()">
        <span>自定义标签</span>
        <span class="btn-left">
          {{shower ? '收起':'更多'}}
          <i :class="shower ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </span>
      </p>
      <div class="tags" v-if="shower">
        <el-button type="text" plain class="tag-cell adder" @click="dialogVisible = true">+</el-button>
        <span
          v-longpress="pressBtn(index, item.id)"
          @click="chooseTag(index)"
          v-for="(item, index) in listForShow"
          :key="index"
          class="tag-cell"
          :class="{'active': item.ifCheck}"
        >
          {{item.tagName}}
          <i
            @click="deleteTag(item.id)"
            v-show="item.deleteShow"
            class="tag-delete el-icon-error"
          ></i>
        </span>
      </div>
    </div>
    <div class="tag-panel" v-for="(item, key) in tagObjs" :key="key">
      <p class="tag-name" @click="listControl(key)">
        <span>{{item.name}}</span>
        <span class="btn-left">
          {{item.ifCheck ? '收起' : '更多'}}
          <i
            :class="item.ifCheck ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i>
        </span>
      </p>
      <div class="tags" v-if="item.ifCheck">
        <span
          class="tag-cell"
          v-for="(inner, index) in item.list"
          :class="{'active': inner.ifCheck}"
          :key="index"
          @click="checkTags(key, index)"
        >{{inner.name}}</span>
      </div>
    </div>
    <div class="btn-bottom">
      <button @click="addTagsConfirm()">确定</button>
    </div>
    <el-dialog
      title="自定义标签"
      :visible.sync="dialogVisible"
      width="65%"
      :before-close="handleClose"
      :show-close="false"
      :center="true"
    >
      <div class="tag-contain">
        <el-input v-model="newTag" placeholder="请输入会员标签"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="success" @click="addConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "AddTag",
  data() {
    return {
      dialogVisible: false,
      newTag: "",
      unionid: this.$route.query.unionid,
      parentUserid: localStorage.getItem("wxUserid"),
      userTags: [],
      listForShow: [],
      shower: false,
      tagObjs: {
        age_tag: {
          name: "年龄阶段",
          list: [
            { name: "00后" },
            { name: "90后" },
            { name: "80后" },
            { name: "70后" },
            { name: "60后" },
            { name: "50后" },
            { name: "50前" }
          ]
        },
        marriage_tag: {
          name: "婚史",
          list: [{ name: "已婚" }, { name: "未婚" }, { name: "离异" }]
        },
        temperament_tag: {
          name: "脾气",
          list: [{ name: "好" }, { name: "一般" }, { name: "不好" }]
        },
        distance_tag: {
          name: "居住距离",
          list: [
            { name: "门店500米内" },
            { name: "门店1公里内" },
            { name: "门店3公里内" },
            { name: "门店3公里外" }
          ]
        },
        income_tag: {
          name: "收入情况",
          list: [{ name: "高" }, { name: "中" }, { name: "低" }]
        },
        education_tag: {
          name: "教育水平",
          list: [
            { name: "研究生及以上" },
            { name: "本科" },
            { name: "大专" },
            { name: "职校" },
            { name: "高中" },
            { name: "初中" },
            { name: "小学" },
            { name: "无学历" }
          ]
        },
        profession_tag: {
          name: "职业",
          list: [
            { name: "国企" },
            { name: "事业单位" },
            { name: "教师" },
            { name: "白领" },
            { name: "家庭主妇" },
            { name: "个体老板" },
            { name: "已退休" },
            { name: "程序员" }
          ]
        },
        effect_tag: {
          name: "社区影响力",
          list: [{ name: "高" }, { name: "中" }, { name: "低" }]
        },
        communicate_tag: {
          name: "喜欢的沟通方式",
          list: [
            { name: "电话" },
            { name: "短信" },
            { name: "微信" },
            { name: "面对面" },
            { name: "不想沟通" }
          ]
        },
        healthcare_tag: {
          name: "保健偏好",
          list: [
            { name: "推拿" },
            { name: "针灸" },
            { name: "沐足" },
            { name: "头疗" },
            { name: "美容" },
            { name: "美发" },
            { name: "皮肤护理" }
          ]
        },
        family_tag: {
          name: "家庭情况",
          list: [
            { name: "备孕期" },
            { name: "新生儿家庭" },
            { name: "婴幼家庭" },
            { name: "中大童家庭" },
            { name: "长者家庭" }
          ]
        }
      }
    };
  },
  computed: {
    // listForShow() {
    //   let c = this.tagList
    //   c.forEach(item => {
    //     this.userTags.forEach(inner => {
    //       item.id === inner.tagID && (item.ifCheck = true)
    //     })
    //   })
    //   return JSON.parse(JSON.stringify(c))
    // },
    listToUpdate() {
      let a = this.tagObjs,
        tar = {};
      Object.keys(a).forEach(item => {
        a[item]["list"].forEach(inner => {
          inner.ifCheck && (tar[item] = inner.name);
        });
        !tar[item] && (tar[item] = "");
      });
      return tar;
    }
  },
  mounted() {
    // this.getTags()
    this.getAllList();
    this.getInitialTags();
  },
  methods: {
    getInitialTags() {
      const formData = JSON.parse(this.$route.query.tags);
      let a = this.tagObjs;
      Object.keys(a).forEach(key => {
        Object.keys(formData).forEach(form => {
          if (key === form) {
            if (formData[form]) {
              a[key]["list"].forEach(item => {
                item.name === formData[form] && (item.ifCheck = true);
              });
            }
          }
        });
      });
      this.tagObjs = JSON.parse(JSON.stringify(a));
    },
    centerControl() {
      this.shower = !this.shower;
      console.log(this.shower);
    },
    listControl(key) {
      // console.log(this.tagObjs[key])
      let a = this.tagObjs;
      a[key].ifCheck = !a[key].ifCheck;
      this.tagObjs = JSON.parse(JSON.stringify(a));
    },
    checkTags(key, index) {
      // console.log(this.tagObjs[key])
      let a = this.tagObjs;
      a[key].list.forEach((item, i) => {
        index === i ? (item.ifCheck = !item.ifCheck) : (item.ifCheck = false);
      });
      this.tagObjs = JSON.parse(JSON.stringify(a));
    },
    getAllList() {
      this.$axios.all([this.getTags(), this.getUserTags()]).then(
        this.$axios.spread((tags, userTags) => {
          this.userTags = userTags.data.dataList;
          let c = tags.data.dataList;
          c.forEach(item => {
            this.userTags.forEach(inner => {
              item.id === inner.tagID && (item.ifCheck = true);
            });
          });
          this.listForShow = JSON.parse(JSON.stringify(c));
        })
      );
    },
    deleteTag(id) {
      this.$axios
        .post(
          "/tag/delete",
          {
            id: id
          },
          {
            headers: {
              "x-s-userid": this.parentUserid
            }
          }
        )
        .then(res => {
          console.log(res);
          res.data.desc === "success" && this.getAllList();
        });
    },
    chooseTag(index) {
      let c = this.listForShow;
      c.forEach((item, i) => {
        if (index === i) {
          item["ifCheck"] = !item["ifCheck"];
          console.log(item);
        }
      });
      this.listForShow = JSON.parse(JSON.stringify(c));
    },
    pressBtn(i, id) {
      return () => {
        this.$nextTick(() => {
          let c = this.listForShow;
          c.forEach((item, index) => {
            if (index === i) {
              item.deleteShow = !item.deleteShow;
              console.log(item.deleteShow);
            }
          });
          this.listForShow = JSON.parse(JSON.stringify(c));
        });
      };
    },
    addCancel() {
      this.newTag = "";
      this.dialogVisible = false;
    },
    addConfirm() {
      this.$axios
        .post(
          "/tag/add",
          {
            // wxUserid: this.wxUserid,
            unionid: this.unionid,
            tagName: this.newTag
          },
          {
            headers: {
              "x-s-userid": this.parentUserid
            }
          }
        )
        .then(res => {
          if (res.data.desc === "success") {
            this.newTag = "";
            this.dialogVisible = false;
            this.getAllList();
          }
        });
    },
    clearAdd() {
      let idList = [];
      this.listForShow.forEach(item => {
        item.ifCheck && idList.push(item.id);
      });
      return this.$axios.post(
        "userTag/clearAndAdd",
        {
          unionid: this.unionid,
          // wxUserid: this.wxUserid,
          tagIDList: idList
        },
        {
          headers: {
            "x-s-userid": this.parentUserid
          }
        }
      );
      // .then(res => {
      //   if (res.data.desc === "success") {
      //     this.$router.push({
      //       path: "/member_detail",
      //       query: { unionid: this.unionid }
      //     });
      //   }
      // });
    },
    updateTag() {
      return this.$axios.post(
        "/user/updateTag",
        {
          unionid: this.unionid,
          ...this.listToUpdate
        },
        {
          headers: {
            "x-s-userid": this.parentUserid
          }
        }
      );
    },
    addTagsConfirm() {
      this.$axios.all([this.clearAdd(), this.updateTag()]).then(
        this.$axios.spread((clear, update) => {
          if (
            clear.data.resultCode === "000000" &&
            update.data.resultCode === "000000"
          ) {
            // this.$router.push({
            //   path: "/member_detail",
            //   query: { unionid: this.unionid }
            // });
            window.history.go(-1)
          }
        })
      );
    },
    getTags() {
      return this.$axios.post("/tag/list", null, {
        headers: {
          "x-s-userid": this.parentUserid
        }
      });
    },
    getUserTags() {
      return this.$axios.post(
        "/userTag/list",
        {
          // wxUserid: this.wxUserid
          unionid: this.unionid
        },
        {
          headers: {
            "x-s-userid": this.parentUserid
          }
        }
      );
    },
    handleClose(done) {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
.tit
  background-color #f2dac1
  line-height 80px
  text-indent 30px
  font-size 28px
  color #333
.with-bottom
  margin-bottom 156px
.tag-panel
  background-color #fff
  .line
    display inline-block
    width 4px
    height 30px
    margin-left 30px
    margin-right 14px
    border-radius 2px
    background-image linear-gradient(45deg, #95ce4e 1%, #8ac83a)
  .tag-name
    display flex
    justify-content space-between
    align-items center
    height 90px
    padding 0 34px
    font-size 28px
    color #5c5c5c
    border-bottom 1px solid #f2f2f2
    .btn-left
      font-size 24px
      color #868686
  .tags
    display flex
    justify-content flex-start
    flex-wrap wrap
    padding 27px 8px 0
    margin-bottom 27px
    border-bottom 1px solid #eef0f3
    .tag-cell
      position relative
      display flex
      align-items center
      justify-content center
      border 1px solid #e3e3e3
      font-size 26px
      margin 0 22px
      margin-bottom 28px
      padding 15px 20px
      min-width 200px
      height 56px
      border-radius 4px
      text-align center
      // line-height 35px
      color #5c5c5c
      -webkit-touch-callout none
      -webkit-user-select none
      -khtml-user-select none
      -moz-user-select none
      -ms-user-select none
      user-select none
      .tag-delete
        position absolute
        right -18px
        top -20px
        font-size 45px
        background-color #fff
        border-radius 34px
        color #d5d5d5
    .active
      background-color rgba(138, 200, 58, 0.4)
      color #81bb36
      border-color #81bb36
.tag-contain
  input
    height 60px
    line-height 60px
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
  border-top 1px solid #f2f2f2
  button
    width 580px
    height 70px
    background-color #8ac83a
    // border 1px solid #f90
    color #fff
    border-radius 6px
</style>

