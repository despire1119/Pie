import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/pages/index'], resolve),
      meta: {
        title: '收费统计'
      }
    },
    // {
    //   path: '/home',
    //   name: 'index',
    //   component: resolve => require(['@/components/pages/index'], resolve),
    //   meta: {
    //     title: '导购首页'
    //   }
    // },
    // {
    //   path: '/name_card',
    //   component: resolve => require(['@/components/pages/NameCard'],resolve),
    //   meta: {
    //     title: '我的名片'
    //   }
    // },
    // {
    //   path: '/screen_sel/:type',
    //   component: resolve => require(['@/components/pages/ScreenSel'], resolve),
    //   props: true,
    //   meta: {
    //     title: '顾客列表'
    //   }
    // },
    // {
    //   path: '/add_return',
    //   component: resolve => require(['@/components/pages/AddReturn'], resolve),
    //   meta: {
    //     title: '待办事项'
    //   }
    // },
    // {
    //   path: '/add_tag',
    //   component: resolve => require(['@/components/pages/AddTag'], resolve),
    //   meta: {
    //     title: '会员标签'
    //   }
    // },
    // {
    //   path: '/:type/data_concat',
    //   component: resolve => require(['@/components/pages/DataConcat'], resolve),
    //   props: true,
    //   meta: {
    //     title: '数据统计'
    //   }
    // },
    // {
    //   path: '/member_detail',
    //   component: resolve => require(['@/components/pages/MemberDetail'], resolve),
    //   meta: {
    //     title: '会员详情'
    //   }
    // },
    // {
    //   path: '/data_panel',
    //   component: resolve => require(['@/components/pages/DataPanel'], resolve),
    //   meta: {
    //     title: '数据看板'
    //   }
    // },
    // {
    //   path: '/waiter_list',
    //   component: resolve => require(['@/components/pages/WaiterList'],resolve),
    //   meta: {
    //     title: '待办事项'
    //   }
    // },
    // {
    //   path: '/error',
    //   component: resolve => require(['@/components/pages/Error'],resolve),
    //   meta: {
    //     title: 'Error'
    //   }
    // },
    // {
    //   path: '/enter_shop',
    //   component: resolve => require(['@/components/common/CustomerList'],resolve),
    //   meta: {
    //     title: '进店顾客列表'
    //   }
    // },
    {
      path: '*',
      redirect: '/error',
    }
  ]
})
