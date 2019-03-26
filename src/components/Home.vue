<template>
  <v-layout column class="mybackground" fill-height>
    <v-layout row>
      <v-flex class="ma-5">
        <v-layout row class="display-1" text-md-center>
          <v-flex xs12 sm12>
            <v-card color="primary">
              <v-card-title class="justify-center white--text productsansboldfont">Top 10</v-card-title>
              <v-list>
                <v-list-tile v-for="(item,index) in scores" :key="index" avatar>
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
        </v-layout>
      </v-flex>

      <v-layout column>
        <v-card class="ma-5">
          <v-card-title
            class="justify-center productsansboldfont titlerules primary--text"
          >The rules</v-card-title>
          <v-card-text>
            <p
              class="text-xs-left"
            >On va vous présenter une photo, votre but est de trouver le mot associé à cette photos.</p>
            <br>
            <p
              class="text-xs-left"
            >- Si vous échouez, on va vous remettre une autre photos avec le même mots clé, vous avez le droit à 10 essais mais attention à chaque faux essaie vous perdez 10 points</p>
            <p class="text-xs-left">- Si vous réussiser, bravo, vous gagnez 50 pts</p>
            <br>
            <p
              class="text-xs-left"
            >Vous voulez apparaitre dans le TOP 10 ? N'oubliez pas de vous connecter d'abords pour que votre score soit enregistré</p>
          </v-card-text>
        </v-card>
        <v-flex>
          <v-btn to="/startgame" large color="primary">Start the game !</v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-layout row wrap justify-space-around>
      <v-flex xs4>
        <v-slide-y-transition>
          <v-card class="ma-5" height="65%">
            <v-card-text class="title-card-stats productsansboldfont primary--text">
              <animated-number :value="imageDiplayed" round="1" :duration="5000"/>
            </v-card-text>
            <v-card-text>images affichées</v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-flex>

      <v-flex xs4>
        <v-slide-y-transition>
          <v-card class="ma-5" height="65%">
            <v-card-text class="title-card-stats productsansboldfont primary--text">
              <animated-number :value="percentGoodAnswer" round="10" :duration="5000"/>%
            </v-card-text>
            <v-card-text>de bonnes réponses</v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-flex>

      <v-flex xs4>
        <v-card class="ma-5" height="65%">
          <v-card-text class="title-card-stats productsansboldfont primary--text">
            <animated-number :value="moyFindIn" round="1" :duration="5000"/>
          </v-card-text>
          <v-card-text>nombre d'image en moyenne pour trouver le mot</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import AnimatedNumber from 'animated-number-vue'
import axios from 'axios'

export default {
  data: () => {
    return {
      scores: [{
        pseudo: 'No scores',
        score: ''
      }],
      imageDiplayed: 1,
      percentGoodAnswer: 1,
      moyFindIn: 1
    }
  },
  methods: {
    async getHighScore () {
      var db = firebase.firestore()
      var scores = []
      db.collection('highscore').get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          var score = doc.data().score
          var docRef = db.collection('users').doc(doc.data().idUser)
          docRef.get().then(function (doc) {
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
            scores.sort((a, b) =>
              b.score - a.score
            )
            if (scores.length > 9) {
              scores = scores.slice(0, 9)
            }
          })
        })
        this.scores = scores
      })
        .catch(function (error) {
          console.error('Error writing document: ', error)
          alert('Oops. ' + error.message)
        })
    },
    getStats () {
      axios
        .get('http://www.dexemple.fr:8085/api-project-front-end_war/ga/images-display')
        .then(response => (this.imageDiplayed = response.data))

      axios
        .get('http://www.dexemple.fr:8085/api-project-front-end_war/ga/percent-good-answer')
        .then(response => (this.percentGoodAnswer = response.data))

      axios
        .get('http://www.dexemple.fr:8085/api-project-front-end_war/ga/average-find-it')
        .then(response => (this.moyFindIn = response.data))
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
