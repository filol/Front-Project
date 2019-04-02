import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import Login from './components/Login'
import StartGame from './components/StartGame'
import Game from './components/Game'
import Home from './components/Home'
import About from './components/About'
import SignUp from './components/SignUp'
import SignOut from './components/SignOut'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Vuex from 'vuex'
import UserStore from './stores/UserStore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import VueAnalytics from 'vue-analytics'
import Highscore from './components/Highscore'

import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const config = {
  apiKey: 'AIzaSyAS1pMMvqTQdyUPblG9LB5iAhwBrLUo8gc',
  authDomain: 'front-end-project-a7897.firebaseapp.com',
  databaseURL: 'https://front-end-project-a7897.firebaseio.com',
  projectId: 'front-end-project-a7897',
  storageBucket: '',
  messagingSenderId: '463381758221'
}

firebase.initializeApp(config)

const routes = [
  {
    path: '/startgame',
    name: 'startgame',
    component: StartGame,
    props: route => ({
      force: route.query.force
    })
  },
  { path: '/game', name: 'game', component: Game },
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/signup', component: SignUp },
  { path: '/login', component: Login },
  { path: '/signout', component: SignOut },
  {
    path: '/highscore',
    component: Highscore,
    props: route => ({
      onlyme: route.query.onlyme
    })
  }
]

const router = new VueRouter({ routes })

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//   if (requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('')
//   else next()
// })

Vue.use(VueAnalytics, {
  id: 'UA-136864524-1',
  router
})

new Vue({
  router,
  store: UserStore,
  render: h => h(App)
}).$mount('#app')
