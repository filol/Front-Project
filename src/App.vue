<template>
  <v-app>
    <v-toolbar app class="elevation-0 boxhead productsansfont" color="background">
      <router-link to="/">
        <v-toolbar-title class="headline text-uppercase hide-max-logo">
          <span class="white--text productsansboldfont">RECOGNIZE</span>
          <span class="font-weight-light white--text productsansfont">MY CAT</span>
        </v-toolbar-title>
        <v-toolbar-title class="headline text-uppercase hide-mini-logo">
          <span class="white--text productsansboldfont">R</span>
          <span class="font-weight-light white--text productsansfont">MC</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidebuttons">
        <v-btn
          v-for="item in menu"
          :key="item.title"
          :to="item.link"
          class="white--text"
          flat
        >{{ item.title }}</v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="userConnected">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn round color="primary" dark small class="badge-user" v-on="on">
              <v-flex fill-height>
                <span class="white--text mr-3 aligner-name" v-if="hasPseudo">{{pseudo}}</span>
                <span class="white--text mr-3 aligner-name" v-else>{{email}}</span>
              </v-flex>
              <v-flex>
                <v-avatar :size="50">
                  <img :src="avatar" alt>
                </v-avatar>
              </v-flex>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="item in userMenu" :key="item.title" :to="item.link">{{ item.title }}</v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-menu class="hidemenu">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in menu" :key="item.title">
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
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { EventBus } from './plugins/event-bus.js'

export default {
  name: 'App',
  components: {},
  data () {
    return {
      menu:
        [
          { title: 'Home', link: '/' },
          { title: 'Game', link: '/startgame' },
          { title: 'Highscore', link: '/highscore' },
          { title: 'About', link: '/about' },
          { title: 'Login', link: '/login' },
          { title: 'SignUp', link: '/signup' }
        ],
      userMenu:
        [
          { title: 'My scores', link: '/highscore?onlyme=true' },
          { title: 'Change my pseudo', link: '/startgame?force=true' },
          { title: 'SignOut', link: '/signout' }
        ],
      userConnected: false,
      pseudo: '',
      avatar: '',
      email: '',
      hasPseudo: false
    }
  },
  methods: {
    updateMenu () {
      console.log('update menu')
      var currentUser = firebase.auth().currentUser
      if (currentUser) {
        this.userConnected = true
        this.email = currentUser.email
        if (this.$store.state.pseudo !== '') {
          this.hasPseudo = true
          this.pseudo = this.$store.state.pseudo
          this.avatar = this.$store.state.avatar
        } else {
          this.hasPseudo = false

          // We check if it exist in db
          var db = firebase.firestore()
          db.collection('users').where('email', '==', this.email).get()
            .then((snapshot) => {
              if (!snapshot.empty) {
                // L'utilisateur à déjà son pseudo d'inscrit dans la bdd
                this.$store.commit('SET_PSEUDO', snapshot.docs[0].data().pseudo)
                this.$store.commit('SET_AVATAR', snapshot.docs[0].data().avatar)
                this.hasPseudo = true
                this.pseudo = this.$store.state.pseudo
                this.avatar = this.$store.state.avatar
              }
            }).catch(function (error) {
              console.log('Error getting document:', error)
            })
        }
        this.menu =
          [
            { title: 'Home', link: '/' },
            { title: 'Game', link: '/startgame' },
            { title: 'Highscore', link: '/highscore' },
            { title: 'About', link: '/about' }
          ]
      } else {
        this.userConnected = false
        this.email = ''
        this.pseudo = ''
        this.avatar = ''
        this.menu =
          [
            { title: 'Home', link: '/' },
            { title: 'Game', link: '/startgame' },
            { title: 'Highscore', link: '/highscore' },
            { title: 'About', link: '/about' },
            { title: 'Login', link: '/login' },
            { title: 'SignUp', link: '/signup' }
          ]
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(this.updateMenu)
    EventBus.$on('update-menu', () => {
      console.log('event receive')
      this.updateMenu()
    })
  }
}
</script>

<style>
@font-face {
  font-family: "productsans";
  src: url("./assets/fonts/ProductSansRegular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "productsansbold";
  src: url("./assets/fonts/ProductSansBold.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.productsansfont {
  font-family: "productsans";
}
.productsansboldfont {
  font-family: "productsansbold";
}

.boxhead a {
  color: #ffffff;
  text-decoration: none;
}
@media (min-width: 900px) {
  .hidemenu {
    display: none;
  }
}
@media (max-width: 901px) {
  .hidebuttons {
    display: none;
  }
}

@media (min-width: 440px) {
  .hide-mini-logo {
    display: none;
  }
}
@media (max-width: 440px) {
  .hide-max-logo {
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

.aligner-name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.badge-user {
  height: 50px !important;
}
</style>
