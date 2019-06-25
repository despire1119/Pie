
import Vue from 'vue'
import Vuex from 'vuex'
import normal from './modules/normal'
import user from './modules/user'
// import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    normal,
    user,
  }
})