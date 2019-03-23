import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import Login from './components/Login'
import Game from './components/Game'
import Home from './components/Home'
import About from './components/About'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Vuex from 'vuex'
import UserStore from './stores/UserStore'

import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const routes = [
  { path: '/login', component: Login },
  { path: '/game', name: 'game', component: Game },
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  store: UserStore,
  render: h => h(App)
}).$mount('#app')
