<template>
<div>
  <ul class="bottom-bar">
    <router-link replace tag="li" to="/" :class="type==0?'active':null">
      <!-- <img src="" alt="" class="status-img"> -->
      <i class="el-icon-user icons"></i>
      <i class="des">导购</i>
    </router-link>
    <li>
      <i class="el-icon-date icons"></i>
      <i class="des">慢病管理</i>
    </li>
    <router-link replace tag="li" to="/data_panel" :class="type==2?'active':null">
      <i class="el-icon-data-line icons"></i>
      <i class="des">数据看板</i>
    </router-link>
    <li>
      <i class="el-icon-first-aid-kit icons"></i>
      <i class="des">工具箱</i>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'BottomBar',
  props: ['type'],
  mounted() {
    // console.log(this.type)
  },
}
</script>
<style lang="stylus" scoped>
.bottom-bar
  position fixed
  left 0
  right 0
  bottom 0
  height 98px
  border-top 1px solid #dcdcdc
  display flex
  align-items center
  justify-content space-around
  background-color #fff
  font-size 22px  
  color #505050
  padding-bottom constant(safe-area-inset-bottom)
  li
    display flex
    flex-direction column
    // justify-content center
    align-items center
    .icons
      font-size 40px
      margin-top 10px
  .active
    color #44aa30
    .status-img
      background-color #44aa30
  .status-img
    width 36px
    height 36px
    background-color #dddddd
    margin-bottom 10px
</style>
