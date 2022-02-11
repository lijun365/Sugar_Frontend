import Vue from 'vue'
import Vuex from 'vuex'

import sugarmark from './modules/SuagrMark.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sugarmark
  }
})
