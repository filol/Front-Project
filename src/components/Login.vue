<template>
  <v-layout fill-height class="mybackground">
    <v-container>
      <v-layout row wrap align-center>
        <v-flex xs12 sm8 offset-sm2 align-center justify-center>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Sign In</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field v-model="email" name="emailid" placeholder="Email"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        type="password"
                        name="password"
                        v-model="password"
                        placeholder="Password"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </form>
                <v-alert :value="true" type="error" v-if="hasError">Error : {{ errorMsg }}</v-alert>
                <v-card-actions class="justify-center">
                  <v-btn flat color="primary" @click="login">Sign In</v-btn>
                </v-card-actions>
                <p>
                  You don't have an account ? You can
                  <router-link to="/signup">create one</router-link>
                </p>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      hasError: false,
      errorMsg: ''
    }
  },
  methods: {
    login: function () {
      this.hasError = false
      const router = this.$router
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          var db = firebase.firestore()
          db.collection('users').where('email', '==', this.email).get()
            .then((snapshot) => {
              if (!snapshot.empty) {
                // L'utilisateur à déjà son pseudo d'inscrit dans la bdd
                this.$store.commit('SET_PSEUDO', snapshot.docs[0].data().pseudo)
                this.$store.commit('SET_AVATAR', snapshot.docs[0].data().avatar)
                router.replace('game')
              } else {
                router.replace('startgame')
              }
            }).catch(function (error) {
              console.log('Error getting document:', error)
              this.errorMsg = 'Oops, mistakes, it happens...'
              this.hasError = true
            })
          router.replace('startgame')
        },
        (err) => {
          this.errorMsg = err.message
          this.hasError = true
        }
      )
    }
  }
}
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
.mybackground {
  background-color: var(--v-background-base);
}
</style>
