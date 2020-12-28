import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: "",
  },
  mutations: {
    setJwt(state, jwt) {
      state.jwt = jwt;
      localStorage.setItem("jwt", jwt)
    }
  },
  actions: {
  },
  modules: {
  }
})
