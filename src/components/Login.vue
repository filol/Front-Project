<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <button @click="login">Connection</button>
    <p>
      You don't have an account ? You can
      <router-link to="/signup">create one</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
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
              alert('errors append ....')
            })
          router.replace('startgame')
        },
        (err) => {
          alert('Oops. ' + err.message)
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
</style>
