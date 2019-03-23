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

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          this.$router.replace('startgame')
        },
        function (err) {
          alert('Oops. ' + err.message)
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
