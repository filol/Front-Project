<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <div class="sign-up">
      <p>Let's create a new account !</p>
      <v-text-field
        type="text"
        v-model="email"
        placeholder="Email"
        outline
        offset-sm4
        sm4
        text-sm-center
      />
      <br>
      <v-text-field
        type="password"
        v-model="password"
        placeholder="Password"
        outline
        offset-sm4
        sm4
        text-sm-center
      />
      <br>
      <v-btn @click="signUp">Sign Up</v-btn>
      <span>
        or go back to
        <router-link to="/connexion">login</router-link>.
      </span>
    </div>
  </div>
</template>

<template>
  <v-layout fill-height class="mybackground">
    <v-container>
      <v-layout row wrap align-center>
        <v-flex xs12 sm8 offset-sm2 align-center justify-center>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Let's create a new account !</v-toolbar-title>
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
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        type="password"
                        name="password"
                        v-model="passwordCheck"
                        placeholder="Retype your password"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </form>
                <v-alert
                  transition="scale-transition"
                  :value="true"
                  type="error"
                  v-if="hasError"
                >Error : {{ errorMsg }}</v-alert>
                <v-card-actions class="justify-center">
                  <v-btn flat color="primary" @click="signUp">Sign Up</v-btn>
                </v-card-actions>
                <p>
                  Already have an account ?
                  <router-link to="/login">Login</router-link>
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
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: '',
      passwordCheck: '',
      hasError: false,
      errorMsg: ''
    }
  },
  methods: {
    signUp: function () {
      if (this.password !== this.passwordCheck) {
        this.errorMsg = 'passwords do not match'
        this.hasError = true
        return
      }
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('startgame')
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
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
