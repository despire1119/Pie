webpackJsonp([9],{"6tAg":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={props:["type"],name:"DataConcat",data:()=>({switcher:{concat:"顾客联系行为统计",buy:"消费行为统计",coupen:"优惠券统计",add_new:"新会员办卡及绑卡统计"},tabs:[{name:"今日",ifCheck:!0},{name:"近7天",ifCheck:!1},{name:"近30天",ifCheck:!1}],wxUserid:localStorage.getItem("wxUserid"),contactList:[],consumeList:[],couponList:[],newCustomerDetail:[]}),mounted(){switch(this.type){case"concat":this.getInfo("/stat/contactBehaviorDetail",t=>{console.log(t),this.contactList=t.dataList});break;case"buy":this.getInfo("/stat/consumeBehaviorDetail",t=>{console.log(t),this.consumeList=t.dataList});break;case"coupen":this.getInfo("/stat/couponBehaviorDetail",t=>{this.couponList=t.dataList});break;case"add_new":this.getInfo("/stat/newCustomersDetail",t=>{this.newCustomerDetail=t.dataList})}},methods:{check(t){this.tabs.forEach((e,a)=>{t===a?(e.ifCheck=!0,0===t&&(document.title="全部顾客"),1===t&&(document.title="顾客列表")):e.ifCheck=!1})},getInfo(t,e){this.$axios.post(t,{pageNo:1,pageSize:1e5},{headers:{"x-s-userid":this.wxUserid}}).then(t=>{e(t.data)})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"tabs"},[a("div",{staticClass:"tabs-contain"},t._l(t.tabs,function(e,n){return a("span",{key:n,staticClass:"tab tab-right",class:{active:e.ifCheck},on:{click:function(e){t.check(n)}}},[t._v(t._s(e.name))])}),0)]),t._v(" "),a("table",{staticClass:"data-center",attrs:{align:"center"}},["concat"==t.type?a("tr",[a("th",[t._v("成员")]),t._v(" "),a("th",[t._v("加新")]),t._v(" "),a("th",[t._v("聊天人数")]),t._v(" "),a("th",[t._v("已回复")]),t._v(" "),a("th",[t._v("首聊时长")])]):t._e(),t._v(" "),"buy"==t.type?a("tr",[a("th",[t._v("成员")]),t._v(" "),a("th",[t._v("活跃率(%)")]),t._v(" "),a("th",[t._v("客单价(元)")]),t._v(" "),a("th",[t._v("购物频次(次)")])]):t._e(),t._v(" "),"coupen"==t.type?a("tr",[a("th",[t._v("成员")]),t._v(" "),a("th",[t._v("发送数量")]),t._v(" "),a("th",[t._v("使用数量")]),t._v(" "),a("th",[t._v("券平均客单价")])]):t._e(),t._v(" "),"add_new"==t.type?a("tr",[a("th",[t._v("成员")]),t._v(" "),a("th",[t._v("电子卡注册数")]),t._v(" "),a("th",[t._v("实体卡绑定数")]),t._v(" "),a("th",[t._v("实体卡注册数")])]):t._e(),t._v(" "),t._l(t.contactList,function(e,n){return a("tr",{directives:[{name:"show",rawName:"v-show",value:"concat"===t.type,expression:"type === 'concat'"}],key:n},[a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.addCount))]),t._v(" "),a("td",[t._v(t._s(e.chatCount))]),t._v(" "),a("td",[t._v(t._s(e.chatReplyRatio))]),t._v(" "),a("td",[t._v(t._s(e.avgReplyDuration))])])}),t._v(" "),t._l(t.consumeList,function(e,n){return a("tr",{directives:[{name:"show",rawName:"v-show",value:"buy"===t.type,expression:"type === 'buy'"}],key:n},[a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.activityRate))]),t._v(" "),a("td",[t._v(t._s(e.customerUnitPrice))]),t._v(" "),a("td",[t._v(t._s(e.buyCount))])])}),t._v(" "),t._l(t.couponList,function(e,n){return a("tr",{directives:[{name:"show",rawName:"v-show",value:"coupen"==t.type,expression:"type == 'coupen'"}],key:n},[a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.sendCount))]),t._v(" "),a("td",[t._v(t._s(e.useCount))]),t._v(" "),a("td",[t._v(t._s(e.avgUnitPrice))])])}),t._v(" "),t._l(t.newCustomerDetail,function(e,n){return a("tr",{directives:[{name:"show",rawName:"v-show",value:"add_new"==t.type,expression:"type == 'add_new'"}],key:n},[a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.onlineRegCount))]),t._v(" "),a("td",[t._v(t._s(e.cardBindCount))]),t._v(" "),a("td",[t._v(t._s(e.cardRegCount))])])})],2)])},staticRenderFns:[]};var s=a("C7Lr")(n,i,!1,function(t){a("p02J")},"data-v-5c1ab34c",null);e.default=s.exports},iNvb:function(t,e,a){(t.exports=a("UTlt")(!1)).push([t.i,'.tabs[data-v-5c1ab34c]{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;padding:2vw 0;content:"viewport-units-buggyfill; padding: 2vw 0"}.tabs .tabs-contain[data-v-5c1ab34c]{border:1px solid #e3e3e3;border-radius:4vw;overflow:hidden;margin:auto;content:"viewport-units-buggyfill; border-radius: 4vw"}.tabs .tabs-contain .tab[data-v-5c1ab34c]{display:inline-block;width:19.467vw;height:8vw;text-align:center;line-height:8vw;color:#868686;content:"viewport-units-buggyfill; width: 19.467vw; height: 8vw; line-height: 8vw"}.tabs .tabs-contain .active[data-v-5c1ab34c]{background-color:#d4ebb6;color:#81bb36}.tabs .tabs-contain .tab-left[data-v-5c1ab34c]{border-left:1px solid #e3e3e3}.tabs .tabs-contain .tab-right[data-v-5c1ab34c]{border-right:1px solid #e3e3e3}.data-center[data-v-5c1ab34c]{width:100%;border-collapse:collapse}.data-center th[data-v-5c1ab34c]{font-weight:1;font-style:normal;padding:3.2vw 0;font-size:3.2vw;color:#868686;content:"viewport-units-buggyfill; padding: 3.2vw 0; font-size: 3.2vw"}.data-center td[data-v-5c1ab34c]{font-size:3.733vw;padding:4.533vw 0;background-color:#fff;text-align:center;border-bottom:1px solid #eef0f3;content:"viewport-units-buggyfill; font-size: 3.733vw; padding: 4.533vw 0"}',""])},p02J:function(t,e,a){var n=a("iNvb");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("FIqI")("269cb859",n,!0,{})}});