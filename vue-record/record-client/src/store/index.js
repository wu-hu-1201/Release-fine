import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import record from './modules/record'
import release from './modules/release'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    record,
    release
  }
})
