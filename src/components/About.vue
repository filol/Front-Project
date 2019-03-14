<template>
  <v-layout fill-height column class="mybackground">
    <v-container xs6>
      <v-layout column fill-height justify-space-around xs>
        <v-flex text-xs-center>
          <h1 class="display-2 font-weight-bold mb-3 white--text">The dream TEAM</h1>
        </v-flex>
        <v-flex>
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
        </v-flex>

        <h2 class="display-5 font-weight-bold mb-3 white--text">Our developpers</h2>
        <v-layout row justify-space-around xs>
          <v-flex text-xs-center>
            <v-avatar :size="100" color="grey lighten-4">
              <img src="https://randomuser.me/api/portraits/lego/8.jpg" alt>
            </v-avatar>
            <h3>Adrien Dat</h3>
          </v-flex>

          <v-flex text-xs-center>
            <v-avatar :size="100" color="grey lighten-4">
              <img src="@/assets/photos/Francois.png" alt>
            </v-avatar>
            <h3>François Dexemple</h3>
          </v-flex>

          <v-flex text-xs-center>
            <v-avatar :size="100" color="grey lighten-4">
              <img src="@/assets/photos/Gregoire.png" alt>
            </v-avatar>
            <h3>Grégoire Monet</h3>
          </v-flex>

          <v-flex text-xs-center>
            <v-avatar :size="100" color="grey lighten-4">
              <img src="https://randomuser.me/api/portraits/lego/7.jpg" alt>
            </v-avatar>
            <h3>Baptiste Perreaux</h3>
          </v-flex>
        </v-layout>
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

<style>
.mybackground {
  background-color: var(--v-background-base);
}
</style>
