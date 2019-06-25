<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      ifLoginPage: this.$route.name == "Login",
      userInfo: {}
    };
  },
  mounted() {
  },
  methods: {
    hideTab() {
      this.$refs.child.closeAll();
    }
  },
  mounted() {
    // this.$axios
    //   .post("/suning/api/govbus/FulladdressGetTest.php", {
    //     sn_request: {
    //       sn_body: {
    //         getFullAddress: {
    //         }
    //       }
    //     }
    //   })
    //   .then(res => console.info("全量地址", res));
    // this.$axios.post()
    // console.log(this.purListWithLocal);
    // console.info("userinfo", this.userInfo);
  },
  updated() {
    this.ifLoginPage = this.$route.path.indexOf("login") != -1;
    this.ifOrderConfirm = this.$route.path.indexOf("order_confirm") > -1;
  },
  computed: {
    ...mapState({
      isLoading: state => state.normal.isLoading,
    }),
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.base-line
  height 28px
  background-color #f67517
.loader
  position fixed
  display flex
  justify-content center
  align-items center
  cursor not-allowed
  top 0
  right 0
  bottom 0
  left 0
  z-index 9999999999
.bg-content
  box-sizing content-box
  padding 18px
  border-radius 15px
  background-color rgba(0, 0, 0, 0.8)
.lds-default
  display inline-block
  position relative
  width 64px
  height 64px
.lds-default div
  position absolute
  width 5px
  height 5px
  background #fff
  border-radius 50%
  animation lds-default 1.2s linear infinite
.lds-default div:nth-child(1)
  animation-delay 0s
  top 29px
  left 53px
.lds-default div:nth-child(2)
  animation-delay -0.1s
  top 18px
  left 50px
.lds-default div:nth-child(3)
  animation-delay -0.2s
  top 9px
  left 41px
.lds-default div:nth-child(4)
  animation-delay -0.3s
  top 6px
  left 29px
.lds-default div:nth-child(5)
  animation-delay -0.4s
  top 9px
  left 18px
.lds-default div:nth-child(6)
  animation-delay -0.5s
  top 18px
  left 9px
.lds-default div:nth-child(7)
  animation-delay -0.6s
  top 29px
  left 6px
.lds-default div:nth-child(8)
  animation-delay -0.7s
  top 41px
  left 9px
.lds-default div:nth-child(9)
  animation-delay -0.8s
  top 50px
  left 18px
.lds-default div:nth-child(10)
  animation-delay -0.9s
  top 53px
  left 29px
.lds-default div:nth-child(11)
  animation-delay -1s
  top 50px
  left 41px
.lds-default div:nth-child(12)
  animation-delay -1.1s
  top 41px
  left 50px
@keyframes lds-default
  0%, 20%, 80%, 100%
    transform scale(1)
  50%
    transform scale(1.5)
.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
</style>
