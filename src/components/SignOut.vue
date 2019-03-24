<template>
  <div></div>
</template>

<script>
import firebase from 'firebase'

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
