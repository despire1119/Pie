webpackJsonp([2],{"3dri":function(t,e,a){"use strict";function i(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,e,a,s){e=e||"&",a=a||"=";var o={};if("string"!=typeof t||0===t.length)return o;var n=/\+/g;t=t.split(e);var l=1e3;s&&"number"==typeof s.maxKeys&&(l=s.maxKeys);var d=t.length;l>0&&d>l&&(d=l);for(var c=0;c<d;++c){var g,v,u,w,p=t[c].replace(n,"%20"),f=p.indexOf(a);f>=0?(g=p.substr(0,f),v=p.substr(f+1)):(g=p,v=""),u=decodeURIComponent(g),w=decodeURIComponent(v),i(o,u)?r(o[u])?o[u].push(w):o[u]=[o[u],w]:o[u]=w}return o};var r=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},JK9a:function(t,e,a){"use strict";var i=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,a,n){return e=e||"&",a=a||"=",null===t&&(t=void 0),"object"==typeof t?s(o(t),function(o){var n=encodeURIComponent(i(o))+a;return r(t[o])?s(t[o],function(t){return n+encodeURIComponent(i(t))}).join(e):n+encodeURIComponent(i(t[o]))}).join(e):n?encodeURIComponent(i(n))+a+encodeURIComponent(i(t)):""};var r=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function s(t,e){if(t.map)return t.map(e);for(var a=[],i=0;i<t.length;i++)a.push(e(t[i],i));return a}var o=Object.keys||function(t){var e=[];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.push(a);return e}},KXRa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("4YfN"),r=a.n(i),s=a("3cXf"),o=a.n(s),n=a("9rMa"),l=a("PCwk"),d=(a("Umb+"),a("XOKi"),l.a,r()({},Object(n.b)({wxUserid:t=>t.normal.wxUserid})),{name:"index",data:()=>({waiterCount:0,ranking:1,count:99,userInfo:localStorage.getItem("userInfo")||{},memberInfo:{},dataType:1,types:[{name:"今天",num:1},{name:"近7天",num:2},{name:"近30天",num:3},{name:"近3月",num:4}]}),methods:{getMemberByType(t){this.dataType=t,this.getMemberData().then(t=>{this.memberInfo=t.data})},getWaiterCount(){return this.$axios.post("/visitRecord/getCount",{status:1},{headers:{"x-s-userid":localStorage.getItem("wxUserid")}})},getMemberData(){return this.$axios.post("/admin/userStat",{dayType:this.dataType},{headers:{"x-s-userid":localStorage.getItem("wxUserid")}})},getAllData(){this.$axios.all([this.getMemberData(),this.getWaiterCount()]).then(this.$axios.spread((t,e)=>{this.memberInfo=t.data,this.waiterCount=res.data.waiterCount}))},showtype(t){this.activeNum=t,this.showkey=!0},hidetype(t){this.activeNum=null,this.showkey=!1},goLogin(){this.$router.push({name:"Login"})}},components:{BottomBar:l.a},mounted(){let t=this.$route.query.code;t&&t!=localStorage.getItem("code")?(console.log("正常登录"),localStorage.setItem("code",t),this.$axios.post("/admin/getByCode",{code:t},{headers:{"x-s-userid":localStorage.getItem("wxUserid")||""}}).then(t=>{console.log("调用接口"),"000000"==t.data.resultCode?(this.userInfo=t.data.admin,localStorage.setItem("userInfo",o()(this.userInfo)),localStorage.setItem("wxUserid",this.userInfo.wxUserid),this.$store.commit("normal/updateUserId",this.userInfo.wxUserid),this.getAllData()):(localStorage.clear(),this.$router.replace({path:"/error"}))})):(console.log("已登录"),localStorage.getItem("userInfo")?(this.userInfo=JSON.parse(localStorage.getItem("userInfo")),this.getAllData()):this.$router.replace({path:"/error"}))},computed:r()({},Object(n.b)({wxUserid:t=>t.normal.wxUserid}))}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"guider-area"},[a("div",{staticClass:"info"},[a("div",{staticClass:"avatar-container"},[a("img",{staticClass:"avatar",attrs:{src:t.userInfo.avatar,alt:""}})]),t._v(" "),a("div",{staticClass:"detail"},[a("p",{staticClass:"detail-line"},[a("span",{staticClass:"name"},[t._v(t._s(t.userInfo.name))]),t._v(" "),t.userInfo.position?a("span",{staticClass:"role"},[t._v(t._s(t.userInfo.position))]):t._e()]),t._v(" "),a("p",{staticClass:"address"},[t._v(t._s(t.userInfo.departmentName))])]),t._v(" "),t.userInfo.ranking?a("div",{staticClass:"tips"},[a("span",[t._v("当前排行：")]),t._v("\n      第"+t._s(t.userInfo.ranking)+"名\n    ")]):a("div",{staticClass:"tips"},[a("span",[t._v("当前排行：")]),t._v("未上榜\n    ")])]),t._v(" "),a("div",{staticClass:"add-me"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("router-link",{staticClass:"share-card",attrs:{tag:"button",to:"/name_card"}},[t._v("分享名片")])],1),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"my-customers"},[a("div",{staticClass:"cus-tit with-right"},[t._m(3),t._v(" "),a("div",{staticClass:"to-row"},[a("router-link",{staticClass:"cus-count",attrs:{to:{path:"/screen_sel/normal",query:{ifAll:1,test:"123sasfde"}},tag:"span"}},[t._v("全部顾客("+t._s(t.memberInfo.total)+"人)")]),t._v(" "),a("router-link",{staticClass:"el-icon-arrow-right",staticStyle:{"margin-top":"3px","margin-left":"5px"},attrs:{to:{path:"/screen_sel/normal",query:{ifAll:1}},tag:"i"}})],1)]),t._v(" "),a("div",{staticClass:"data-panel"},[a("ul",{staticClass:"panel-tit"},t._l(t.types,function(e,i){return a("li",{key:i,class:i==t.dataType-1?"active":null,on:{click:function(a){t.getMemberByType(e.num)}}},[t._v(t._s(e.name))])}),0),t._v(" "),a("router-link",{staticClass:"panel-body",attrs:{tag:"table",to:{path:"screen_sel/normal",query:{dayType:t.types[t.dataType-1].name}},border:"1",frame:"void"}},[a("tr",[a("td",[a("router-link",{staticClass:"data-itself",attrs:{tag:"p",to:{path:"screen_sel/normal",query:{dayType:t.types[t.dataType-1].name}}}},[t._v(t._s(t.memberInfo.vip))]),t._v(" "),a("p",{staticClass:"des"},[t._v("我的VIP")])],1),t._v(" "),a("td",[a("router-link",{staticClass:"data-itself",attrs:{tag:"p",to:{path:"screen_sel/normal",query:{dayType:t.types[t.dataType-1].name}}}},[t._v(t._s(t.memberInfo.supreme))]),t._v(" "),a("p",{staticClass:"des"},[t._v("至尊会员")])],1)]),t._v(" "),a("tr",[a("td",[a("router-link",{staticClass:"data-itself",attrs:{tag:"p",to:{path:"screen_sel/normal",query:{dayType:t.types[t.dataType-1].name}}}},[t._v(t._s(t.memberInfo.ordinary))]),t._v(" "),a("p",{staticClass:"des"},[t._v("普通会员")])],1),t._v(" "),a("td",[a("router-link",{staticClass:"data-itself",attrs:{tag:"p",to:{path:"screen_sel/normal",query:{dayType:t.types[t.dataType-1].name}}}},[t._v(t._s(t.memberInfo.nonMember))]),t._v(" "),a("p",{staticClass:"des"},[t._v("非会员")])],1)])])],1)]),t._v(" "),a("div",{staticClass:"my-customers stream-bottom"},[a("div",{staticClass:"cus-tit"},[a("i",{staticClass:"target"}),t._v(" "),a("span",[t._v("待办任务")]),t._v(" "),a("router-link",{staticClass:"el-icon-circle-plus-outline add-btn",attrs:{to:"/add_return",tag:"i"}})],1),t._v(" "),a("div",{staticClass:"data-panel with-margin-top"},[a("table",{staticClass:"panel-body",attrs:{border:"1",frame:"void"}},[a("tr",[a("router-link",{attrs:{to:"/waiter_list",tag:"td"}},[a("p",{staticClass:"data-itself"},[t._v(t._s(t.waiterCount||0))]),t._v(" "),a("p",{staticClass:"des"},[t._v("我的待办")])]),t._v(" "),t._m(4),t._v(" "),t._m(5)],1),t._v(" "),t._m(6)])])]),t._v(" "),a("bottom-bar",{attrs:{type:0}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"adder-container"},[e("img",{staticClass:"adder",attrs:{src:a("ixoF"),alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"adder-info"},[e("p",{staticClass:"adder-tit"},[this._v("加顾客")]),this._v(" "),e("p",{staticClass:"adder-detail"},[this._v("分享工作微信给顾客")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"searcher",staticStyle:{display:"none"}},[e("div",{staticClass:"icon-search"},[e("img",{attrs:{src:a("NzrC"),alt:""}})]),this._v(" "),e("input",{attrs:{type:"text",placeholder:"请输入会员手机号"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"to-row"},[e("i",{staticClass:"target"}),this._v(" "),e("span",[this._v("我的顾客")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("p",{staticClass:"data-itself"},[this._v("0")]),this._v(" "),e("p",{staticClass:"des"},[this._v("防降级任务")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("p",{staticClass:"data-itself"},[this._v("0")]),this._v(" "),e("p",{staticClass:"des"},[this._v("至尊会员续费")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",[a("p",{staticClass:"data-itself"},[t._v("0")]),t._v(" "),a("p",{staticClass:"des"},[t._v("复购提醒")])]),t._v(" "),a("td",[a("p",{staticClass:"data-itself"},[t._v("0")]),t._v(" "),a("p",{staticClass:"des"},[t._v("新会员招募")])]),t._v(" "),a("td",[a("p",{staticClass:"data-itself"},[t._v("0")]),t._v(" "),a("p",{staticClass:"des"},[t._v("店长任务")])])])}]};var g=a("C7Lr")(d,c,!1,function(t){a("WmPO")},null,null);e.default=g.exports},M33s:function(t,e,a){(t.exports=a("UTlt")(!1)).push([t.i,'div{font-family:Helvetica Neue,PingFang SC,sans-serif}.guider-area{padding:2vw 2.667vw;content:"viewport-units-buggyfill; padding: 2vw 2.667vw"}.guider-area .info{position:relative;height:21.333vw;padding-left:2.667vw;-webkit-box-shadow:1px .227vw .933vw 0 rgba(0,0,0,.29);box-shadow:1px .227vw .933vw 0 rgba(0,0,0,.29);background-color:#95ce4e;font-size:3.733vw;color:#fff;content:"viewport-units-buggyfill; height: 21.333vw; padding-left: 2.667vw; -webkit-box-shadow: 1px 0.227vw 0.933vw 0 rgba(0,0,0,0.29); box-shadow: 1px 0.227vw 0.933vw 0 rgba(0,0,0,0.29); font-size: 3.733vw"}.guider-area .info,.guider-area .info .detail-line{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.guider-area .info .name{font-size:3.733vw;line-height:5.067vw;content:"viewport-units-buggyfill; font-size: 3.733vw; line-height: 5.067vw"}.guider-area .info .role{height:5.067vw;border:1px solid #fff;border-radius:5.067vw;font-size:2.667vw;margin-left:1.333vw;padding:0 2vw;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;content:"viewport-units-buggyfill; height: 5.067vw; border-radius: 5.067vw; font-size: 2.667vw; margin-left: 1.333vw; padding: 0 2vw"}.guider-area .info .address{font-size:2.933vw;margin-top:1.6vw;content:"viewport-units-buggyfill; font-size: 2.933vw; margin-top: 1.6vw"}.guider-area .info .avatar-container{background-color:#fff;width:13.333vw;height:13.333vw;border-radius:6.667vw;margin-right:2.667vw;overflow:hidden;content:"viewport-units-buggyfill; width: 13.333vw; height: 13.333vw; border-radius: 6.667vw; margin-right: 2.667vw"}.guider-area .info .avatar-container .avatar{width:100%;height:100%}.guider-area .info .tips{position:absolute;right:1.467vw;top:4vw;font-size:2.933vw;content:"viewport-units-buggyfill; right: 1.467vw; top: 4vw; font-size: 2.933vw"}.guider-area .add-me{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:13.333vw;padding:0 2.667vw;margin-top:4vw;background-color:#fff;-webkit-box-shadow:1px .227vw 1.333vw 0 rgba(0,0,0,.15);box-shadow:1px .227vw 1.333vw 0 rgba(0,0,0,.15);color:#1b252e;content:"viewport-units-buggyfill; height: 13.333vw; padding: 0 2.667vw; margin-top: 4vw; -webkit-box-shadow: 1px 0.227vw 1.333vw 0 rgba(0,0,0,0.15); box-shadow: 1px 0.227vw 1.333vw 0 rgba(0,0,0,0.15)"}.guider-area .add-me .adder-container{width:7.467vw;height:7.733vw;margin-right:2.667vw;content:"viewport-units-buggyfill; width: 7.467vw; height: 7.733vw; margin-right: 2.667vw"}.guider-area .add-me .adder{width:100%;height:100%}.guider-area .add-me .adder-info{-webkit-box-flex:1;-ms-flex:1;flex:1}.guider-area .add-me .adder-tit{font-size:3.733vw;content:"viewport-units-buggyfill; font-size: 3.733vw"}.guider-area .add-me .adder-detail{font-size:3.2vw;color:#5c5c5c;content:"viewport-units-buggyfill; font-size: 3.2vw"}.guider-area .add-me .share-card{width:16vw;height:5.867vw;font-size:3.2vw;border-radius:.667vw;background-image:linear-gradient(45deg,#95ce4e 1%,#8ac83a);color:#fff;content:"viewport-units-buggyfill; width: 16vw; height: 5.867vw; font-size: 3.2vw; border-radius: 0.667vw"}.guider-area .searcher{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;height:8vw;padding:0 2.667vw;margin-top:4vw;background-color:#fff;-webkit-box-align:center;-ms-flex-align:center;align-items:center;content:"viewport-units-buggyfill; height: 8vw; padding: 0 2.667vw; margin-top: 4vw"}.guider-area .searcher .icon-search{width:3.333vw;margin-right:2.667vw;content:"viewport-units-buggyfill; width: 3.333vw; margin-right: 2.667vw"}.guider-area .searcher .icon-search img{width:100%;height:100%}.guider-area .searcher input{font-size:3.2vw;outline:none;-webkit-box-flex:1;-ms-flex:1;flex:1;content:"viewport-units-buggyfill; font-size: 3.2vw"}.guider-area .stream-bottom{margin-bottom:18.4vw;content:"viewport-units-buggyfill; margin-bottom: 18.4vw"}.guider-area .my-customers{background-color:#fff;margin-top:4vw;padding:0 1.333vw 3.467vw;-webkit-box-shadow:1px .227vw 1.333vw 0 rgba(0,0,0,.15);box-shadow:1px .227vw 1.333vw 0 rgba(0,0,0,.15);content:"viewport-units-buggyfill; margin-top: 4vw; padding: 0 1.333vw 3.467vw; -webkit-box-shadow: 1px 0.227vw 1.333vw 0 rgba(0,0,0,0.15); box-shadow: 1px 0.227vw 1.333vw 0 rgba(0,0,0,0.15)"}.guider-area .my-customers .target{display:inline-block;width:.533vw;height:4vw;margin-right:1.333vw;background-color:#95ce4e;content:"viewport-units-buggyfill; width: 0.533vw; height: 4vw; margin-right: 1.333vw"}.guider-area .my-customers .cus-tit{position:relative;padding:4vw 2.667vw;font-size:3.733vw;color:#1b252e;border-bottom:1px solid #f2f2f2;content:"viewport-units-buggyfill; padding: 4vw 2.667vw; font-size: 3.733vw"}.guider-area .my-customers .cus-tit,.guider-area .my-customers .cus-tit .to-row{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.guider-area .my-customers .with-right{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.guider-area .my-customers .add-btn{position:absolute;top:3.2vw;right:2.667vw;width:6vw;height:6vw;font-size:6.667vw;line-height:6vw;color:#8ac83a;content:"viewport-units-buggyfill; top: 3.2vw; right: 2.667vw; width: 6vw; height: 6vw; font-size: 6.667vw; line-height: 6vw"}.guider-area .my-customers .cus-count{font-size:3.467vw;color:#5c5c5c;content:"viewport-units-buggyfill; font-size: 3.467vw"}.guider-area .my-customers .panel-tit,.guider-area .my-customers .panel-tit li{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.guider-area .my-customers .panel-tit li{-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:16vw;height:6.667vw;background-color:#f8f8f8;color:#868686;font-size:3.467vw;margin:4vw 0;border-right:1px solid #e3e3e3;content:"viewport-units-buggyfill; width: 16vw; height: 6.667vw; font-size: 3.467vw; margin: 4vw 0"}.guider-area .my-customers .panel-tit li:first-child{border-top-left-radius:6.667vw;border-bottom-left-radius:6.667vw;content:"viewport-units-buggyfill; border-top-left-radius: 6.667vw; border-bottom-left-radius: 6.667vw"}.guider-area .my-customers .panel-tit li:last-child{border:0;border-top-right-radius:6.667vw;border-bottom-right-radius:6.667vw;content:"viewport-units-buggyfill; border-top-right-radius: 6.667vw; border-bottom-right-radius: 6.667vw"}.guider-area .my-customers .panel-tit .active{color:#81bb36;background-color:rgba(138,200,58,.4)}.guider-area .my-customers .with-margin-top{margin-top:4vw;content:"viewport-units-buggyfill; margin-top: 4vw"}.guider-area .my-customers .panel-body{width:100%;border-collapse:collapse;border-color:#f2f2f2}.guider-area .my-customers .panel-body td{width:33.333%;font-size:4.267vw;color:#5c5c5c;padding:5.333vw 0 3.2vw;text-align:center;border:1px solid #f2f2f2;content:"viewport-units-buggyfill; font-size: 4.267vw; padding: 5.333vw 0 3.2vw"}.guider-area .my-customers .panel-body td .des{font-size:3.2vw;content:"viewport-units-buggyfill; font-size: 3.2vw"}.guider-area .my-customers .panel-body li{font-size:3.2vw;color:#5c5c5c;padding:5.333vw 0 3.2vw;text-align:center;width:46vw;content:"viewport-units-buggyfill; font-size: 3.2vw; padding: 5.333vw 0 3.2vw; width: 46vw"}.guider-area .my-customers .panel-body .data-itself{font-size:4.267vw;color:#0082ef;content:"viewport-units-buggyfill; font-size: 4.267vw"}.guider-area .my-customers .panel-body .red-color{color:#f3c}',""])},NzrC:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAADOElEQVRIx7XVT2gcZRjH8e8z7yQTQoob6CFQg0qJUjyIqLQeqqUphRo0BpLFnUlykEg0CGnAq3gRL/6FgE0QSwmzswkBc2iqltpao6CJlxx68FREKkJQskbd7J+87+NlAzXZ0E1intPM+z7w4fk9DCPsUEmS9Khqj4icUNUOEQFARBZV9aaqTkdRtEwdJVsPcrnc06r6SblcftT3fYwxAD8AFVW9H3jorvaLwGgYhn/XjWSz2ZdV9dNyuUxbW9ulQqFwsVQqLUdR9Ndmz+Tk5JEgCF4IgmBMVTuA29bazoGBgZ/vieRyuchaGwdBUGhubu7q6uq6ea8Y4jj+UETOO+f+bGpqOtbX1/dbrT4PYG5u7uGNjY1YVWlsbHyiHgCgv79/LAiCN0XkPhH5Yqc+D6BUKk1ZazHGPN/d3f1TPcBm9fb2vu153pxz7rHx8fFXaiJLS0tPVSqV477vL4RhOL8bYLPy+fyr1T2+UxNZXl7uN8bg+/67ewEARkZGVlT1irX28PT09PFtSEtLyzMAqrq4VwTA9/1Zay2qenIbAhwFCtbaP/aDOOd+ERFU9WgtxAesc073g4jIRvXR1ELuqOqh1tbWQ/uc5IiIYK39dRtirf2+evn4fhCg0zlHKpXatlvP87xZEWFtbe38PuPqV1VdX1//ttYkV6y1Kw0NDS/OzMw8shdgdnb2A2ttk+d576XT6X+2IYODg1osFgcLhQLOuctxHDfvBkiSpKdSqYwZY9Z833+rVo8HMDQ0dLW9vf39YrHYAfyYzWYfrAeI4/glVf0M+N3zvDPpdHq9ZpR3v0xMTHycSqVec84BvCEilzKZzH++nyRJjIg8qaqjqpoB8DxvMZPJnNhxX1sP5ufnR1dXVz+q/qwArgO3gRLQBpwCDgMYY64754yqnlLVL6MoOlcXAjA1NdVujHkdyIhI+9Z7Y8w3+Xz+wvDw8Ew1tgXP806q6rUois7WhWyJ5wHgGFARkTvASiaTWd2yG09EbojIs8CNMAw7d4XsppIk+QroBL4Ow/D0gSBV6BpwRlUXgNNRFNn/HQHIZrNXReQs8J2qPncgSHWiz4FzwOUDQwByudwF4Na/2yVq6hbzLVcAAAAASUVORK5CYII="},"Umb+":function(t,e,a){"use strict";e.decode=e.parse=a("3dri"),e.encode=e.stringify=a("JK9a")},WmPO:function(t,e,a){var i=a("M33s");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("7cb0ca48",i,!0,{})},ixoF:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA6CAYAAADlTpoVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAE/UlEQVRo3t3aXWwUVRTA8f+Z7ZaCEHbWUEAFI3Q2CkRREx78QJ5MUKOIaCAmJEL96K6AJj6YSELF+GD0wWDbpYq8gUkFFRR8NZFEDAnRWJV0W4wGFwu4u3yU0rozxweqFFraZT7uGs/TJL333Pvbmdu998wKUUW7xhPlnvtEvKUg9wLTUW4StKxCL0oe4aCK7Cv1NhygWcpRTENCz9isNfa03FoR2QzUV9RHNa9ivV48MXd72NBQgcmW3HwsPgUcXwmULrXkiWJTQ2dYc7LCSpRo7VmOcMg3DkBIieq3iZbcY2HNK5Q7aGe7HkFlr4SUT0EVWV5KN3xWdaDddvR2UfcgwsQwcMOU/WrJoqCPa7BHtENjqLs7dByAMFE83U2zBppjoM72n93PidAQOu4SMmXX9zQGS+E3PjwyxR6I/SpgRwa8GCcKk6fMYfWMPj+dfd/BxGBsmQEcQL199uwyv519Ay2PBwzghkLvNw5U4VZzQOYbB4LONOeTGeaBymxjPNQ8UGDAFDBIBFmDvaYmqcgfxoGoGAMietw4UNBD5nzWYeNA17L2mAJ6op/67et/q6YqyWx3JzAvUp3qkUImdZvf7v7XoIi6yqZIcYBH7LUg/YOdByO+i4p+X0ynFgbJEew8KKKe6tMo/RHo+v9SVgVNE7gmU8qkvvOEleHaULX0qXOZ1M9VBwKU0s5ez2MZcD4EXT+ijxabUl+EMbdQy4Z2tnuBqH6C/8paDo/HCy86P4Y1p/ALv+0at73uRvHYhDC9oj6qeRXeKJ5wtv2nC79XQodK9w+B3AM6A5UbR5Tu1dpfOjn366hK9//7COcOdmhs6qmehTH0ToW7QBegMhOYJcKEMfuq9ilyHNHjqPwgcJgY3xRecH6qLrCjszZxqm6V4K1FZdG4kGsMVf1FhB0X3Lrs+XWz8+aAzWrZ9T2Norq54n8igaQcQ3iykHYORg5MbD16h7juDhH/RaDKTDooys4ysbYzmbmBjmUVA5NtuUZVWsJ+FEfB7RvUeGNf5pbLTvFTW3MrYvDm0Kw3FtLOx5Xkqxm3RbPWJOu73weekei+VFBwReXVYsZ5Z7S/x4RWLr1QbQFCALbnJ9lu936ItsiroJ6y8nSmYdcYzeqvcj1mXH0v2tFZa5fPfSkR4wBUaDydcXYFzzQyrnoHkydrP0JkceQ42FlqcrZHlX9UoN3a9TwiyyPHKSfFpSnKMUYAk1tz8/B4N2ocAMIHhfXOmSiHuHwNtucnqcseoC5qmyreYDy2JepxLgPa5fObIn1jOyxE+Krv2TmRF4//BSZajt6MeC+bwAGgst/EMJfWoOVuFCRuyldW7wAM26EIqWvpn2zL6ZgNlC6EjTUAk7fkpgm6Osrz75VhxeK9MGKHEl5c/MBaLIB4DWsEqTWmA0redacAUI3uJK9atgBEWWESB8DAgAuAyEsoXeHj6HKRDTLpvd9uqIsN/G4cWGZWYb1zrNLmV665QtqpaD1ZtdaFB43jAC9u5uvIshDfP9EINLAndxsZR2FhNYDgLTUCRNTYryWGhwqLJ2/JTYseiFxfDaAg8XhMXokcKKrBX5j4Dt1gt/dE+gRZKvh+wR80RJiA67ZFCkTl7WoBAQR5OJHNrRm3oWp+1OvxgMWM87nCW1VFqmYT2dySsRsN7XiGdigV5/7nYmprboUlZASWVNo55LgArCuknW1hJv0brGzGWaLo/Y4AAAAASUVORK5CYII="}});