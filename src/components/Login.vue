<template>
  <v-layout fill-height column justify-space-around class="background">
    <v-container xs6>
      <v-flex text-xs-center xs>
        <v-flex text-xs-center>
          <h1 class="display-2 font-weight-bold mb-3 white--text">
            Recognize my cat
          </h1>
        </v-flex>
        <v-spacer></v-spacer>

        <v-flex offset-xs4 xs4 text-xs-center>
          <v-text-field
            dark
            label="Enter your pseudo"
            outline
            single-line
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>

        <v-carousel
          class="elevation-0"
          width="50"
          height="100"
          xs6
          hide-delimiters
        >
          <v-carousel-item :key="i" v-for="i in getNumberPagesPictures()">
            <v-layout row>
              <v-flex xs4 :key="j" v-for="(item, j) in getPictures(i - 1)">
                <v-avatar :size="100" color="grey lighten-4">
                  <img :src="item.src" alt />
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-container>
    <div class="text-xs-center">
      <v-btn class="white--text" color="green">Start !</v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  data: () => {
    return {
      numberAvatarByPage: 3,
      items: [
        {
          src: 'https://randomuser.me/api/portraits/lego/8.jpg'
        },
        {
          src: 'https://randomuser.me/api/portraits/lego/7.jpg'
        },
        {
          src: 'https://randomuser.me/api/portraits/lego/6.jpg'
        },
        {
          src: 'https://randomuser.me/api/portraits/lego/5.jpg'
        },
        {
          src: 'https://randomuser.me/api/portraits/lego/4.jpg'
        },
        {
          src: 'https://randomuser.me/api/portraits/lego/3.jpg'
        },
        {
          src: 'https://randomuser.me/api/portraits/lego/2.jpg'
        }
      ]
    }
  },
  methods: {
    getPictures (index) {
      return this.items.slice(
        this.numberAvatarByPage * index,
        this.numberAvatarByPage * (index + 1)
      )
    },
    getNumberPagesPictures () {
      return Math.ceil(this.items.length / this.numberAvatarByPage)
    }
  }
}
</script>

<style scopped>
.background {
  background-color: #535759;
}
</style>
