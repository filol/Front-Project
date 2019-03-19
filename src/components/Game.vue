<template>
  <div class="page">
    <v-container>
      <v-layout row class="display-1" text-xs-center  wrap>
        <Player/>
        <v-flex class="gameContainer" order-sm2 order-xs1 justify-center md9>

          Guess the key word of the image:
          <v-layout row class="display-1 gameImage" text-md-center>
            <v-flex xs8 offset-xs2>
              <v-layout column>
                <v-img max-height="800px" v-bind:src="image" aspect-ratio="1.7"></v-img>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout row class="display-1" text-md-center>
            <v-flex justify-center xs8 offset-xs2>
              <v-text-field v-model="playerWordInput" label="Solo" placeholder="Your word" solo></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row class="display-1" text-md-center>
            <v-flex justify-center xs8 offset-xs2>
              <v-btn color="#b99458" large>Validate</v-btn>
              <p>Entered word : </p><div class="userInput">{{ playerWordInput }}</div>
            </v-flex>
          </v-layout>



        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Player from './Player'
export default {
  data: () => {
    return {
      playerWordInput: '',
      image:
        'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg'
    }
  },
  methods: {},
  components: { Player }
}
</script>

<style scopped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
.page {
  background-color: var(--v-background-base);
  width: 100;
  height: 100%;
  color: #b99458;
}
.gameContainer {
  /*background-color: green;  FOR DEBUG PURPOSES */
}
.gameImage {
  margin-top: 20px;
}
.userInput {
  color: white;
  display: inline
}



</style>
