// state
const state = {
  purlist: "???????"
}

//mutations
const mutations = {
  updatePurList(state, payload) {
    state.purList = payload
  }
}


export default {
  namespaced: true,
  state,
  mutations
}