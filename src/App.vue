<template>
<v-app>
    <!--<NavBar></NavBar>
    <Footer></Footer>-->
    <router-view></router-view>
</v-app>
</template>

<script>
import "material-icons/iconfont/material-icons.scss";
/* import NavBar from './components/NavBar'
import Footer from './components/Footer' */

export default {
    name: "App",

    /* components: {
        NavBar,
        Footer,
      }, */

    data: () => ({
        //
    }),
};
</script>
