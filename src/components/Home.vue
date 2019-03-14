<template>
  <v-layout fill-height column class="mybackground">
    <v-container xs6>
      <v-layout column fill-height justify-space-around text-xs-center xs>
        <v-flex text-xs-center>
          <h1 class="display-2 font-weight-bold mb-3 white--text">HOME</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data: () => {
    return {}
  },
  methods: {}
}
</script>

<style >
.mybackground {
  background-color: var(--v-background-base);
}
</style>
