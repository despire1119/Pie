<template>
  <div>
    <!-- <img width="375px" :src="dataUrl" alt> -->
    <div ref="toCanvas">
      <div class="green-panel">
        <div class="img-container">
          <img src="@/assets/images/logo_forest.png" alt class="logo">
        </div>
        <p class="slogen">专属健康顾问 免费服务</p>
        <div class="code-imgs">
          <div class="beauty">
            <img
              :src="userInfo.avatar"
              @click="preView(userInfo.avatar)"
              alt
              class="beauty-img"
            >
          </div>
          <div class="code-panel">
            <div class="code-container">
              <img :src="adminQrCode" alt class="code-img">
            </div>
            <p class="code-name">{{userInfo.name}}</p>
          </div>
        </div>
      </div>
      <div class="card-wx" v-if="miniprogramQrCode">
        <div class="wx-code">
          <img :src="miniprogramQrCode" alt class="wx-code-img">
        </div>
        <div class="wx-txt">
          <img src="@/assets/images/slogon.png" alt class="wx-txt-img">
        </div>
      </div>
    </div>
    <button @click="saveImg" class="save-img">保存至相册</button>
  </div>
</template>
<script>
import { userInfo } from "os";
import html2canvas from "html2canvas";
// import { mapState } from 'vuex'
export default {
  name: "NameCard",
  data() {
    return {
      dataUrl: "",
      userInfo: {},
      wxUserid: localStorage.getItem("wxUserid"),
      adminQrCode: "",
      miniprogramQrCode: ""
    };
  },
  mounted() {
    // this.getBase64("http://p1.pstatp.com/large/435d000085555bd8de10").then(res => {
    //   console.log(res)
    // })
    // this.preView()
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios
      .post("/admin/getQrCode", null, {
        headers: {
          "x-s-userid": this.wxUserid
        }
      })
      .then(res => {
        this.adminQrCode = res.data.adminQrCode;
        this.miniprogramQrCode = res.data.miniprogramQrCode;
      });
  },
  computed: {
    // ...mapState
  },
  methods: {
    getBase64(img) {
      function getBase64Image(img, width, height) {
        //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
      }
      var image = new Image();
      image.crossOrigin = "";
      image.src = img;
      var deferred = $.Deferred();
      if (img) {
        image.onload = function() {
          deferred.resolve(getBase64Image(image)); //将base64传给done上传处理
        };
        return deferred.promise(); //问题要让onload完成后再return sessionStorage['imgTest']
      }
    },
    saveImg() {
      // wx.downloadImage({
      //   serverId: this.adminQrCode, // 需要下载的图片的服务器端ID，由uploadImage接口获得
      //   isShowProgressTips: 1, // 默认为1，显示进度提示
      //   success: function (res) {
      //     alert(this.adminQrCode)
      //     alert(res.localId)
      //   }
      // });
      html2canvas(this.$refs.toCanvas, {
        backgroundColor: null,
        allowTaint: true,
        // useCORS: true
      }).then(canvas => {
        // console.log(canvas);
        let dataURL = canvas.toDataURL("image/png");
        this.dataUrl = dataURL;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.green-panel
  background-color #bcdc96
  padding-top 40px
  .img-container
    width 150px
    height 40px
    margin auto
  .logo
    width 100%
    height 100%
  .slogen
    margin-top 36px
    font-size 36px
    text-align center
    color #fff
  .code-imgs
    display flex
    padding 40px 66px 70px 94px
    justify-content space-between
  .beauty
    display inline-block
    width 298px
    height 296px
    background-color #dddddd
    .beauty-img
      width 100%
      height 100%
  .code-panel
    .code-container
      display inline-block
      width 250px
      height 250px
      background-color #dddddd
    .code-img
      width 100%
      height 100%
    .code-name
      margin-top 15px
      text-align center
      font-size 42px
.card-wx
  display flex
  justify-content space-between
  align-items center
  padding 10px 110px 26px 117px
  background-color #ffffff
  img
    display inline-block
  .wx-code
    width 233px
    height auto
    .wx-code-img
      width 100%
      height 100%
  .wx-txt
    width 236px
    height 128px
    .wx-txt-img
      width 100%
      height 100%
.save-img
  width 580px
  height 80px
  border-radius 5px
  display block
  font-size 28px
  margin 120px auto 0
  color #fff
  background-image linear-gradient(45deg, #95ce4e 1%, #8ac83a)
</style>


