<template>
  <v-layout column class="mybackground" fill-height>
    <v-layout row>
      <v-flex class="ma-5">
        <v-layout row class="display-1" text-md-center>
          <v-flex xs12 sm12>
            <v-card color="grey darken-1">
              <v-card-title>Top 10</v-card-title>
              <v-list>
                <v-list-tile v-for="(item,index) in scores" :key="index" avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>#{{index+1}}</v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.pseudo"></v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-title v-html="item.score"></v-list-tile-title>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-layout column>
        <v-card class="ma-5">
          <v-card-title>The rules</v-card-title>
          <v-card-text>
            <p>On va vous présenter une photo, votre but est de trouver le mot associé à cette photos</p>
            <br>
            <p>- Si vous échouez, on va vous remettre une autre photos avec le même mots clé, vous avez le droit à 10 essais mais attention à chaque faux essaie vous perdez 10 points</p>
            <br>
            <p>- Si vous réussiser, bravo vous gagnez 50 pts</p>
            <br>
          </v-card-text>
        </v-card>
        <v-flex>
          <v-btn to="/startgame" large color="success">Start the game !</v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-layout row justify-space-around>
      <v-card class="ma-5">Card 1</v-card>
      <v-card class="ma-5">Card 2</v-card>
      <v-card class="ma-5">Card 3</v-card>
    </v-layout>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => {
    return {
      scores: [{
        pseudo: 'No scores',
        score: ''
      }] }
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
    }
  },
  created () {
    this.getHighScore()
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
a,
button {
  pointer-events: all;
}
</style>
