<template>
  <v-flex class="playerContainer" justify-center order-sm1 order-xs2 md3>
    <v-layout row class="display-1" text-md-center>
      <v-flex xs12 sm12>
        <v-card color="grey darken-1">
          <v-img v-bind:src="playerAvatar" aspect-ratio="2.75" max-height="200px"></v-img>

          <v-layout row class="display-1 playerAvatar" text-md-center>
            <v-flex xs10 offset-xs1>
              <v-avatar color="grey lighten-4">
                <img v-bind:src="playerAvatar" alt="avatar">
              </v-avatar>
            </v-flex>
          </v-layout>

          <v-layout row class="display-1" text-md-center>
            <v-flex justify-center xs10 offset-xs1>
              <p>{{ playerName }}</p>
            </v-flex>
          </v-layout>

          <v-layout row class="display-1" text-md-center>
            <v-flex justify-center xs10 offset-xs1>
              <p>Score: {{ playerScore }}</p>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  data: () => {
    return {
      playerAvatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
      playerName: 'Musinux',
      playerScore: 0
    }
  },
  mounted () {
    this.playerAvatar = this.$store.state.avatar
    this.playerName = this.$store.state.pseudo
    this.playerScore = this.$store.state.score
  }
}
</script>

<style scopped>
.playerContainer {
  /* background-color: yellow; FOR DEBUG PURPOSES ONLY !! */
}
.playerAvatar {
  margin-top: 10px;
}

.display-1 {
  color: white;
}
</style>
