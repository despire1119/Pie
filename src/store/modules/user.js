const state = {
  userInfo: null
}

//mutations
const mutations = {
  updateUserInfo(state, payload) {
    state.userInfo = payload
  },
  deleteUserInfo(state) {
    state.userInfo = null
  }
}

//getters
const getters = {
  userInfoWithLocal: function (state) {
    const local = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
    return state.userInfo || local
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