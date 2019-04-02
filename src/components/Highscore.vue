<template>
  <v-layout fill-height row class="mybackground">
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="my-5">
        <v-progress-circular indeterminate color="primary" class="ma-5" v-if="isLoading"></v-progress-circular>
        <v-list subheader v-else>
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
  props: {
    onlyme: {
      type: String
    }
  },
  data () {
    return {
      scores: [{
        pseudo: 'No scores',
        score: ''
      }],
      isLoading: true
    }
  },
  methods: {
    async getHighScore () {
      var db = firebase.firestore()
      var currentUser
      const scores = []

      if (this.onlyme === 'true') {
        currentUser = firebase.auth().currentUser
        if (currentUser) {
          db.collection('users').where('email', '==', currentUser.email).get()
            .then((snapshot) => {
              if (!snapshot.empty) {
                const idAccount = snapshot.docs[0].id
                const pseudo = snapshot.docs[0].data().pseudo
                const avatar = snapshot.docs[0].data().avatar
                db.collection('highscore').where('idUser', '==', idAccount).get().then((querySnapshot) => {
                  querySnapshot.forEach(function (doc) {
                    const score = doc.data().score
                    scores.push({
                      avatar: avatar,
                      pseudo: pseudo,
                      score: score
                    })

                    scores.sort((a, b) =>
                      b.score - a.score
                    )
                  })
                  this.scores = scores
                  this.isLoading = false
                })
                  .catch(function (error) {
                    console.error('Error writing document: ', error)
                  })
              }
            }).catch(function (error) {
              console.log('Error getting document:', error)
            })
        }
      } else {
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
          this.isLoading = false
        })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
      }
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
