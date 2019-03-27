<template>
  <v-layout row class="mybackground">
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="my-5">
        <v-list subheader>
          <v-list-tile v-for="(item,index) in scores" :key="index" avatar>
            <v-list-tile-content>
              <v-list-tile-title>#{{index+1}}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content class="ml-3">
              <v-list-tile-title v-html="item.pseudo"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-title v-html="item.score+'pts'"></v-list-tile-title>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

<style>
.mybackground {
  background-color: var(--v-background-base);
}
</style>
