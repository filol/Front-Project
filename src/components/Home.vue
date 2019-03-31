<template>
  <v-layout column class="mybackground" fill-height>
    <v-layout row wrap>
      <v-flex lg3 md4 sm12 xs12 order-md1 order-sm2 order-xs2>
        <v-card class="ma-5" color="primary">
          <v-card-title class="justify-center white--text productsansboldfont titlerules">Top 10</v-card-title>
          <v-list>
            <v-progress-circular indeterminate color="primary" class="ma-5" v-if="isLoadingTop"></v-progress-circular>
            <v-list-tile v-else v-for="(item,index) in scores" :key="index" avatar>
              <v-flex shrink>
                <v-list-tile-content>
                  <v-list-tile-title>#{{index+1}}</v-list-tile-title>
                </v-list-tile-content>
              </v-flex>
              <v-flex shrink>
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
              </v-flex>
              <v-flex shrink>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.pseudo"></v-list-tile-title>
                </v-list-tile-content>
              </v-flex>
              <v-flex grow>
                <v-list-tile-action class="text-xs-right">
                  <v-list-tile-title class="text-xs-right" v-html="item.score+'pts'"></v-list-tile-title>
                </v-list-tile-action>
              </v-flex>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex lg9 md8 sm12 xs12 order-md2 order-sm1 order-xs1>
        <v-card class="ma-5">
          <v-card-title
            class="justify-center productsansboldfont titlerules primary--text"
          >The rules</v-card-title>
          <v-card-text>
            <p
              class="text-xs-left"
            >We will choose for you a random word to guess and to do so, you will be granted an image in relation with it.</p>
            <br>
            <p
              class="text-xs-left"
            >- If you fail guessing the word, you will loose 10 pts and then have another shot with another related photo. You will have 10 tries per word max.</p>
            <p class="text-xs-left">- If you succeed, bravo, you win 50 pts.</p>
            <br>
            <p
              class="text-xs-left"
            >Want to appear in the TOP 10? Do not forget to log in first for your score to be saved</p>
          </v-card-text>
        </v-card>

        <v-btn to="/startgame" large color="primary">Start the game !</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around>
      <v-flex xs4>
        <v-slide-y-transition>
          <v-card class="ma-5" height="65%">
            <v-card-text class="title-card-stats productsansboldfont primary--text">
              <v-progress-circular
                indeterminate
                size="64"
                color="primary"
                class="ma-5"
                v-if="isLoadingStat1"
              ></v-progress-circular>
              <animated-number :value="imageDiplayed" round="1" :duration="5000" v-else/>
            </v-card-text>
            <v-card-text>displayed images</v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-flex>

      <v-flex xs4>
        <v-slide-y-transition>
          <v-card class="ma-5" height="65%">
            <v-card-text class="title-card-stats productsansboldfont primary--text">
              <v-progress-circular
                indeterminate
                size="32"
                color="primary"
                class="ma-5"
                v-if="isLoadingStat2"
              ></v-progress-circular>
              <animated-number :value="percentGoodAnswer" round="10" :duration="5000" v-else/>%
            </v-card-text>
            <v-card-text>of good answers</v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-flex>

      <v-flex xs4>
        <v-card class="ma-5" height="65%">
          <v-card-text class="title-card-stats productsansboldfont primary--text">
            <v-progress-circular
              indeterminate
              size="64"
              color="primary"
              class="ma-5"
              v-if="isLoadingStat3"
            ></v-progress-circular>
            <animated-number :value="moyFindIn" round="10" :duration="5000" v-else/>
          </v-card-text>
          <v-card-text>average image to find the word</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import AnimatedNumber from 'animated-number-vue'
import axios from 'axios'

export default {
  data: () => {
    return {
      scores: [
        {
          pseudo: 'No scores',
          score: ''
        }
      ],
      imageDiplayed: 1,
      percentGoodAnswer: 1,
      moyFindIn: 1,
      isLoadingTop: true,
      isLoadingStat1: true,
      isLoadingStat2: true,
      isLoadingStat3: true
    }
  },
  methods: {
    async getHighScore () {
      var db = firebase.firestore()
      var scores = []
      db.collection('highscore')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            var score = doc.data().score
            var docRef = db.collection('users').doc(doc.data().idUser)
            docRef.get().then((doc) => {
              // doc.data() is never undefined for query doc snapshots
              if (doc.exists) {
                scores.push({
                  avatar: doc.data().avatar,
                  pseudo: doc.data().pseudo,
                  score: score
                })
              } else {
                scores.push({
                  pseudo: 'Anonymous',
                  score: score
                })
              }
              scores.sort((a, b) => b.score - a.score)
              if (scores.length > 9) {
                scores = scores.slice(0, 9)
              }
              this.scores = scores
              this.isLoadingTop = false
            })
          })
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    getStats () {
      axios
        .get('https://www.api.front-end-project.dexemple.fr/ga/images-display')
        .then(response => {
          this.imageDiplayed = response.data
          this.isLoadingStat1 = false
        })

      axios
        .get(
          'https://www.api.front-end-project.dexemple.fr/ga/percent-good-answer'
        )
        .then(response => {
          this.percentGoodAnswer = response.data
          this.isLoadingStat2 = false
        })

      axios
        .get('https://www.api.front-end-project.dexemple.fr/ga/average-find-it')
        .then(response => {
          this.moyFindIn = response.data
          this.isLoadingStat3 = false
        })
    }
  },
  created () {
    this.getHighScore()
    this.getStats()
  },
  components: {
    AnimatedNumber
  }
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

.titlerules {
  font-size: 2.5em;
}

.title-card-stats {
  font-size: 4em;
}
</style>
