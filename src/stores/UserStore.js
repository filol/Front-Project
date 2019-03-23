import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  pseudo: '',
  avatar: 'https://randomuser.me/api/portraits/lego/7.jpg',
  score: 0
}

const mutations = {
  SET_PSEUDO: (state, pseudo) => {
    state.pseudo = pseudo
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  INCREASE_SCORE: (state, points) => {
    state.score += points
  },
  DECREASE_SCORE: (state, points) => {
    state.score -= points
  }
}

const getters = {
  pseudo: state => state.pseudo,
  avatar: state => state.avatar,
  score: state => state.score
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: {}
})
