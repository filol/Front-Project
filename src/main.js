import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Login from './components/Login'
import Game from './components/Game'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [{ path: '/login', component: Login }, { path: '/game', component: Game }]

const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
