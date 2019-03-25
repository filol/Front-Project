<template>
  <div class="page">
    <v-container>
      <v-layout row class="display-1" text-xs-center wrap>
        <Player/>
        <v-flex class="gameContainer" order-sm2 order-xs1 justify-center md9>
          Guess the key word of the image ( {{ word.length }} letters ) :
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
          <v-alert
            :value="true"
            type="success"
            v-if="hasWin"
          >Congratulation ! You find the word {{ previousWord }}</v-alert>
          <v-alert
            :value="true"
            type="error"
            v-if="hasLose"
          >You Lose ! You didn't find the word {{ previousWord }} in 10 attempt</v-alert>
          <v-layout row class="display-1" text-md-center>
            <v-flex justify-center xs8 offset-xs2>
              <v-btn color="#b99458" large @click="validate">Validate</v-btn>
              <p>Entered word :</p>
              <div class="userInput">{{ playerWordInput }}</div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Player from './Player'
import dictionary from '../assets/dictionary'
import firebase from 'firebase'

export default {
  data: () => {
    return {
      playerWordInput: '',
      image: '',
      word: '',
      numImg: 0,
      previousWord: '',
      hasWin: false,
      hasLose: false
    }
  },
  mounted () {
    this.setWord()
  },
  methods: {
    async setWord () {
      let numWord = parseInt(Math.random() * dictionary.length)
      this.word = dictionary[numWord]
      const {
        data: { photos }
      } = await this.$http('https://api.pexels.com/v1/search', {
        params: { query: this.word, per_page: 10, page: 1 },
        headers: { Authorization: '563492ad6f9170000100000162a8ad9e59b34275992db6f903ddd7b9' }
      })
      if (photos.length < 10) this.setWord()
      else {
        console.log(this.word)
        this.images = photos
        this.image = photos[0].src.landscape
        this.numImg = 0
      }
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async addScoreToDatabase () {
      const currentUser = firebase.auth().currentUser
      var db = firebase.firestore()
      const router = this.$router

      if (currentUser) {
        db.collection('users').where('pseudo', '==', this.$store.state.pseudo).get().then((doc) => {
          db.collection('highscore').add({
            score: this.$store.state.score,
            idUser: doc.docs[0].id
          })
            .then(function () {
              console.log('Document successfully written!')
              router.push({ name: 'game' })
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
              alert('Oops. ' + error.message)
            })
        })
      }
    },
    async validate () {
      console.log('validation')

      if (this.playerWordInput === this.word) {
        this.previousWord = this.word
        this.setWord()
        this.$store.commit('INCREASE_SCORE', 50)
        this.hasWin = true
        await this.sleep(2000)
        this.hasWin = false
        this.$ga.event({
          eventCategory: 'game',
          eventAction: 'validate',
          eventLabel: 'goodAnswer',
          eventValue: 1
        })
        this.$ga.event({
          eventCategory: 'game',
          eventAction: 'findIn',
          eventValue: this.numImg
        })
      } else {
        this.$store.commit('DECREASE_SCORE', 10)
        this.numImg++
        this.$ga.event({
          eventCategory: 'game',
          eventAction: 'validate',
          eventLabel: 'falseAnswer',
          eventValue: 1
        })
        if (this.numImg === 10) {
          this.$ga.event({
            eventCategory: 'game',
            eventAction: 'neverFind',
            eventValue: 1
          })
          this.previousWord = this.word
          this.setWord()
          this.hasLose = true
          this.addScoreToDatabase()
          await this.sleep(2000)
          this.hasLose = false
        } else this.image = this.images[this.numImg].src.landscape
      }
    }
  },
  components: { Player }
}
</script>

<style scopped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
.page {
  background-color: var(--v-background-base);
  width: 100%;
  height: 100%;
  color: #b99458;
}

.gameImage {
  margin-top: 20px;
}
.userInput {
  color: white;
  display: inline;
}
</style>
