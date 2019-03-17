<template>
  <v-layout fill-height column class="mybackground">
    <particlesJS/>

    <v-container fluid fill-height text-xs-center class="foreground">
      <v-layout row align-center>
        <v-flex>
          <v-btn large color="success">Start the game !</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import particlesJS from './ParticlesJS'

export default {
  data: () => {
    return {}
  },
  methods: {},
  components: { particlesJS }

}
</script>

<style >
.mybackground {
  background-color: var(--v-background-base);
}
.foreground {
  position: absolute;
  pointer-events: none;
}
button {
  pointer-events: all;
}
</style>
