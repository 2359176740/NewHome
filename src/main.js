import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入axios
import axios from "@/api/http";
Vue.prototype.$http = axios;

Vue.config.productionTip = false

let jwt = localStorage.getItem("jwt");
if (jwt) {
  store.commit("setJwt", jwt)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
