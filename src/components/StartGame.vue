<template>
  <v-layout fill-height column class="mybackground">
    <v-container xs6>
      <v-layout column fill-height justify-space-around text-xs-center xs>
        <v-flex text-xs-center>
          <h1 class="display-2 font-weight-bold mb-3 white--text">Welcome in The game</h1>
        </v-flex>

        <v-flex>
          <v-flex offset-sm4 sm4 text-sm-center>
            <v-text-field dark label="Enter your pseudo" outline single-line v-on:keyup="setPseudo"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex text-xs-center>
            <h2 class="display-6 font-weight-bold mb-3 white--text">Choose your avatar</h2>
          </v-flex>
          <v-carousel class="elevation-0" height="125" xs6 hide-delimiters :cycle="false">
            <v-flex>
              <v-carousel-item :key="i" v-for="i in getNumberPagesPicturesArray()">
                <v-layout justify-center row class="pt-2">
                  <v-flex text-xs-center xs4 :key="j" v-for="(item, j) in getPictures(i)">
                    <v-badge overlap v-if="selectedAvatar == i * numberAvatarByPage + j">
                      <template v-slot:badge>
                        <v-icon>done</v-icon>
                      </template>
                      <v-avatar @click="selectAvatar(i, j)" :size="100" color="grey lighten-4">
                        <img :src="item.src" alt>
                      </v-avatar>
                    </v-badge>

                    <v-badge overlap v-else>
                      <v-avatar @click="selectAvatar(i, j)" :size="100" color="grey lighten-4">
                        <img :src="item.src" alt>
                      </v-avatar>
                    </v-badge>
                  </v-flex>
                </v-layout>
              </v-carousel-item>
            </v-flex>
          </v-carousel>
        </v-flex>

        <div class="text-xs-center">
          <v-btn class="white--text" color="primary" @click="start">Start !</v-btn>
        </div>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  data: () => {
    return {
      selectedAvatar: 1,
      pseudo: '',
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
    },
    getNumberPagesPicturesArray () {
      var array = []
      for (var i = 0; i < this.getNumberPagesPictures(); i++) {
        array.push(i)
      }
      return array
    },
    selectAvatar (indexPage, index) {
      this.selectedAvatar = indexPage * this.numberAvatarByPage + index
      this.$store.commit('SET_AVATAR', this.items[this.selectedAvatar].src)
    },
    setPseudo (pseudo) {
      this.pseudo = pseudo.target.value
      this.$store.commit('SET_PSEUDO', pseudo.target.value)
    },
    start () {
      const router = this.$router
      const mypseudo = this.pseudo
      const myavatar = this.items[this.selectedAvatar].src
      const currentUser = firebase.auth().currentUser
      var db = firebase.firestore()
      var docRef = db.collection('users').where('pseudoInsensitve', '==', this.pseudo.toUpperCase())

      if (this.pseudo.length > 15) {
        alert('La taille maximun d\'un pseudo est de 15 caractère, déso, pas déso')
        return
      }

      docRef.get().then((snapshot) => {
        if (!snapshot.empty) {
          if (currentUser) {
            if (!snapshot.docs[0].data().email === currentUser.email) {
              alert('Impossible se pseudo appartient à quelqu\'un')
            }
          } else {
            alert('Impossible se pseudo appartient à quelqu\'un')
          }
        } else {
          if (currentUser) {
            // add pseudo to databse
            db.collection('users').add({
              pseudo: mypseudo,
              pseudoInsensitve: mypseudo.toUpperCase(),
              email: currentUser.email,
              avatar: myavatar
            })
              .then(function () {
                console.log('Document successfully written!')
                router.push({ name: 'game' })
              })
              .catch(function (error) {
                console.error('Error writing document: ', error)
                alert('Oops. ' + error.message)
              })
          } else {
            router.push({ name: 'game' })
          }
        }
      }).catch(function (error) {
        console.log('Error getting document:', error)
        alert('errors append ....')
      })
    }
  },
  async created () {
    const currentUser = firebase.auth().currentUser

    if (currentUser) {
      var db = firebase.firestore()
      var docRef = db.collection('users').where('email', '==', currentUser.email)

      docRef.get().then((snapshot) => {
        if (!snapshot.empty) {
          // L'utilisateur à déjà son pseudo d'inscrit dans la bdd
          this.$store.commit('SET_PSEUDO', snapshot.docs[0].data().pseudo)
          this.$store.commit('SET_AVATAR', snapshot.docs[0].data().avatar)
          this.$router.replace('game')
        } else {
          console.log('doc not exist')
        }
      }).catch(function (error) {
        console.log('Error getting document:', error)
        alert('errors append ....')
      })
    } else {
      console.log('not connected')
    }
    console.log(this.$store)
  },
  computed: {
    numberAvatarByPage () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1
        case 'sm': return 3
        case 'md': return 3
        case 'lg': return 3
        case 'xl': return 3
        default: return 3
      }
    }
  }
}
</script>

<style >
.mybackground {
  background-color: var(--v-background-base);
}
</style>
