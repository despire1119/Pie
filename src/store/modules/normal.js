const state = {
  isLoading: false,
  wxUserid: 'ShunHui',
  listQuery: {
    vip: '',
    tiers: '',  //会员等级
    bigPreference: '',  //大促偏好
    memberDayPreference: '', //会员日偏好
    efPreference: '',  //EF偏好
    chineseMedicine: '',  //中药
    specialPreference: '',  //特价偏好
    ginseng: '',  //参茸
    PassengerAbility: '', //高客单
  },
  screenShow: false
}


const getters = {
  // purListWithLocal: function (state) {
  //   const pur = localStorage.purList ? JSON.parse(localStorage.purList) : {}
  //   return state.purList.info ? state.purList : pur
  // },
  // getCarnumber: function (state) {
  //   let num = 0;
  //   // for (var i = 0; i < state.carList.length; i++) {
  //   //   num += Number(state.carList[i].num);
  //   // }
  //   if(state.carList){
  //     state.carList.forEach(ele => num += Number(ele.num));
  //   return num;
  //   }
    
  // }

}

//mutations
const mutations = {
  updateUserId(state, payload) {
    state.wxUserid = payload
  },
  changeScreenShow(state) {
    state.screenShow = !state.screenShow
  },
  changeListQuery(state, payload) {
    state.listQuery = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
  // getters,
  // actions,
  // mutations
}