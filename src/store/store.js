import Vue from 'vue'
import Vuex from 'vuex'
import city from "./city/city.js"
import user from "./user/user.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules:{
    city,
    user
  }
})
