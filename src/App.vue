<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
      <v-btn to="/login" outline>
        Login vue
      </v-btn>
    </v-toolbar>

    <v-content>
<<<<<<< HEAD
      <Game/>
=======
      <router-view></router-view>
>>>>>>> 2578798a9f70297185f1d14e1ba451f9a9a7712f
    </v-content>
  </v-app>
</template>

<script>
<<<<<<< HEAD
import HelloWorld from './components/HelloWorld'
import Game from './components/Game'


export default {
  name: 'App',
  components: {
    HelloWorld,
    Game
  },
=======
export default {
  name: 'App',
  components: {},
>>>>>>> 2578798a9f70297185f1d14e1ba451f9a9a7712f
  data () {
    return {
      //
    }
  }
}
</script>
