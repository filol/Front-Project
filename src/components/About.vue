<template>
  <v-layout fill-height column class="mybackground">
    <v-container xs6>
      <v-layout column>
        <v-flex text-xs-center>
          <v-card class="ma-5 py-3 px-5" color="primary">
            <h1 class="productsansboldfont mytitle white--text">The dream TEAM</h1>
          </v-card>
        </v-flex>

        <v-flex>
          <v-card class="ma-5 pa-5">
            <p>
              This game have been designed by the Xunisum Team. We have put our
              best developper on this project
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
              turpis sit amet lacus consequat vehicula. Sed tempus, dolor sed
              tincidunt semper, orci ante commodo magna, eu sodales massa ex ac
              massa. Ut justo nulla, bibendum id malesuada ac, aliquam vestibulum
              ipsum. Etiam nec rutrum mauris. Pellentesque erat massa, tristique
              non urna sed, tincidunt consectetur tortor. Praesent sit amet ligula
              ultrices nisl accumsan tempus vel vitae velit. Pellentesque
              fringilla fringilla massa, et tristique purus suscipit quis.
              Maecenas non iaculis ligula.
            </p>
            <p>
              Aliquam vitae dignissim sem, vitae elementum quam. Aenean vitae orci
              mattis elit bibendum gravida sed ut nunc. Integer id facilisis leo.
              Praesent et arcu id dui euismod auctor. Mauris vehicula est in risus
              efficitur, sed iaculis mauris placerat. Integer cursus finibus nisl,
              nec convallis nisl scelerisque ac. Etiam a ornare est. In vulputate
              nibh vitae eros ornare porta. In vitae iaculis nisl. Integer
              efficitur elit sed hendrerit venenatis. Ut at nunc vel urna
              fringilla ornare. Phasellus a accumsan nisl.
            </p>
          </v-card>
        </v-flex>

        <v-card class="ma-5 pa-2" color="primary">
          <h2 class="productsansboldfont mysubtitle white--text">Our developpers</h2>
        </v-card>

        <v-flex xs12>
          <v-layout row fill-height v-bind="binding">
            <v-flex text-xs-center xs3>
              <v-card class="ma-5 pa-5">
                <v-avatar :size="100" color="grey lighten-4">
                  <img src="https://randomuser.me/api/portraits/lego/8.jpg" alt>
                </v-avatar>
                <h3 class="mt-3">Adrien Dat</h3>
              </v-card>
            </v-flex>

            <v-flex text-xs-center xs3>
              <v-card class="ma-5 pa-5">
                <v-avatar :size="100" color="grey lighten-4">
                  <img src="https://randomuser.me/api/portraits/lego/0.jpg" alt>
                </v-avatar>
                <h3 class="mt-3">François Dexemple</h3>
              </v-card>
            </v-flex>

            <v-flex text-xs-center xs3>
              <v-card class="ma-5 pa-5">
                <v-avatar :size="100" color="grey lighten-4">
                  <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt>
                </v-avatar>
                <h3 class="mt-3">Grégoire Monet</h3>
              </v-card>
            </v-flex>

            <v-flex text-xs-center xs3>
              <v-card class="ma-5 pa-5">
                <v-avatar :size="100" color="grey lighten-4">
                  <img src="https://randomuser.me/api/portraits/lego/7.jpg" alt>
                </v-avatar>
                <h3 class="mt-3">Baptiste Perreaux</h3>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.smAndDown) binding.column = true
      return binding
    }
  }
}
</script>

<style>
.mybackground {
  background-color: var(--v-background-base);
}

.mytitle {
  font-size: 2.5em;
}

.mysubtitle {
  font-size: 2em;
}
</style>
