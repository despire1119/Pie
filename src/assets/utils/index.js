import axios from 'axios'
const utils = {
  registWx() {
    const reqUrl = location.href.split("#")[0];
    axios
      .post("/wx/getSignature", {
        url: reqUrl
      })
      .then(res => {
        // alert(`http://${window.location.host}`)
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.corpid, // 必填，企业微信的corpID
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: ["openEnterpriseChat", "getCurExternalContact"] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
      });
  },
  telCheck(tel) {
    return (/^1[3|4|5|7|6|8|9][0-9]{9}$/.test(tel))
  },
  getQueryString(url) {
    url = url ? url : window.location.search
    var theRequest = new Object()
    if (url.indexOf("?") != -1) {
      var str = url.split('?')[1]
      var strs = str.split("&")
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1])
      }
    }
    return theRequest
  },
  Format(date, fmt) { 
    const o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  getDays(targetDay) {
    console.log(targetDay)
    const today = new Date()
    let daySpan = 0
    daySpan = Math.abs(Date.parse(targetDay) - today)
    daySpan = Math.floor(daySpan/(24 * 3600 * 1000))
    return daySpan
  },
  getDateStr(AddDayCount, date) {   
    var dd = date || new Date();  
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
    var y = dd.getFullYear();   
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
    return y+"-"+m+"-"+d;   
 },
 methods: {
  a: () => {
    console.log('a')
    return this
  },
  b: () => {
    console.log('b')
    return a
  },
  c: () => {
    console.log('c')
    return a
  }
}
}

export default utils