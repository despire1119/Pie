<template>
  <div class="err-panel">
    <div class="contain">
      <div class="img-contain">
        <img src="@/assets/images/icon_care@3x.png" alt="" sizes="" srcset="">
      </div>
      <p class="tips">您的企业微信帐号没有权限登录该系统，</p>
      <p class="tips">请联系管理员进行处理</p>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.err-panel
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  display flex
  align-items center
  justify-content center
  .img-contain
    width 130px
    height auto
    margin auto
    margin-bottom 70px
    img
      width 100%
      height 100%
.tips
  text-align center
  color #a6a6a6
  font-size 27px
</style>

