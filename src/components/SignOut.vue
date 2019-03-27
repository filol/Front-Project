<template>
  <div></div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
  beforeCreate () {
    firebase.auth().signOut().then(() => {
      this.$router.replace({ path: '/' })
    }).catch(function (error) {
      console.log(error)
      this.$router.replace({ path: '/' })
    })
  }
}
</script>
