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

      <v-btn to="/" class="white--text" flat>Home</v-btn>
      <v-btn to="/login" class="white--text" flat>Login</v-btn>
      <v-btn to="/game" class="white--text" flat>Game</v-btn>
      <v-btn to="/about" class="white--text" flat>About</v-btn>
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
      //
    }
  }
}
</script>

<style scopped>
.boxhead a {
  color: #ffffff;
  text-decoration: none;
}
</style>
