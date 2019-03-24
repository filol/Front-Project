import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  iconfont: 'md',
  theme: {
    primary: '#b99458',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    background: '#616161'
  }
})
