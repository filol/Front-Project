<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list subheader>
          <v-subheader>HighScore</v-subheader>
          <v-list-tile v-for="item in scores" :key="item.pseudo" avatar>
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

        <v-divider></v-divider>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      scores: [{
        pseudo: 'No scores',
        score: ''
      }]
    }
  },
  methods: {
    async getHighScore () {
      var db = firebase.firestore()
      const scores = []
      db.collection('highscore').orderBy('score', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          var pseudo = doc.data().pseudo
          var score = doc.data().score

          if (pseudo) {
            var docRef = db.collection('users').doc(pseudo)
            docRef.get().then(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              if (doc.exists) {
                scores.push({
                  avatar: doc.data().avatar,
                  pseudo: pseudo,
                  score: score
                })
              } else {
                scores.push({
                  pseudo: pseudo,
                  score: score
                })
              }
            })
          }
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
