<template>
  <v-app>
<<<<<<< HEAD
    <NavBar></NavBar>
    <Footer></Footer>
=======
    <router-view></router-view>
>>>>>>> 973e3d89ea9067a6abce57c01ba5c89c23216c3e
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    NavBar,
    Footer
  },

  data: () => ({
    //
  })
}
</script>
