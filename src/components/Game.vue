<template>
  <div class="page">
    <v-container>
      <v-layout row class="display-1" text-md-center wrap>
        <v-flex class="part2" justify-center order-md1 order-xs2 md3>Salut je suis un test</v-flex>
        <v-flex class="part1" justify-center order-md1 md9>
            
            Guess the key word of the image:

        <v-layout row class="display-1" text-md-center>
          <v-flex xs8 offset-xs2>
            <v-layout column>
              <v-img max-height="800px" src="http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg" aspect-ratio="1.7"></v-img>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout row class="display-1" text-md-center>
          <v-flex justify-center xs8 offset-xs2>
            <v-text-field label="Solo" placeholder="Your word" solo></v-text-field>
        </v-flex>
        </v-layout>


        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  }
};
</script>



<style scopped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
.page {
  background-color: #535759;
  width: 100;
  height: 100%;
  color: #b99458;
}
.part1 {
  background-color: green;
}
.part2 {
  background-color: red;
}
</style>


