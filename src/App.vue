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
          v-for="item in menu"
          :key="item.title"
          :to="item.link"
          class="white--text"
          flat
        >{{ item.title }}</v-btn>
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
export default {
  name: 'App',
  components: {},
  data () {
    return {
      menu: [
        { title: 'Home', link: '/' },
        { title: 'Login', link: '/login' },
        { title: 'Game', link: '/game' },
        { title: 'About', link: '/about' }
      ]
    }
  }
}
</script>

<style scopped>
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
</style>
