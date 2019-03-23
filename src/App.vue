<template>
  <v-app>
    <v-toolbar app class="elevation-0 boxhead" color="background">
      <router-link to="/">
        <v-toolbar-title class="headline text-uppercase">
          <span class="white--text">RECOGNIZE</span>
          <span class="font-weight-light white--text">MY CAT</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidebuttons">
        <v-btn
          v-for="item in getMenu"
          :key="item.title"
          :to="item.link"
          class="white--text"
          flat
        >{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-menu class="hidemenu">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in getMenu" :key="item.title">
            <v-list-tile-content :to="item.link">
              <v-btn :to="item.link" flat>{{ item.title }}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'App',
  components: {},
  data () {
    return {
    }
  },
  computed: {
    getMenu () {
      var currentUser = firebase.auth().currentUser
      var menu
      if (currentUser) {
        menu =
          [
            { title: 'Home', link: '/' },
            { title: 'Game', link: '/startgame' },
            { title: 'Highscore', link: '/highscore' },
            { title: 'About', link: '/about' },
            { title: 'SignOut', link: '/signout' }

          ]
      } else {
        menu =
          [
            { title: 'Home', link: '/' },
            { title: 'Game', link: '/startgame' },
            { title: 'Highscore', link: '/highscore' },
            { title: 'About', link: '/about' },
            { title: 'Login', link: '/login' },
            { title: 'SignUp', link: '/signup' }
          ]
      }
      return menu
    }
  }
}
</script>

<style>
.boxhead a {
  color: #ffffff;
  text-decoration: none;
}
@media (min-width: 650px) {
  .hidemenu {
    display: none;
  }
}
@media (max-width: 651px) {
  .hidebuttons {
    display: none;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
