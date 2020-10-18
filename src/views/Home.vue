<template>
<!--<div>
    <NavBar></NavBar>
    <Footer></Footer>
    <router-view></router-view>
</div>-->
<div class="home">
    <div v-if="user">
        <v-app-bar dark fixed color="primary">
            <v-container>
                <v-row>
                    <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
                    <v-toolbar-title class="my-auto" style="color: orange;">{{titleApp}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn dark @click="signOut" icon>
                        <i class="material-icons">power_settings_new</i>
                    </v-btn>
                </v-row>
            </v-container>
        </v-app-bar>
        <div class="main-section">
            <NavigationDrawer />
            <v-main>
                <v-container class="mt-12">
                    <v-flex shrink class="mt-5">
                        <router-view></router-view>
                    </v-flex>
                </v-container>
            </v-main>
        </div>
    </div>
    <div v-else>
        <v-container>
            <v-alert type="error">Sesión culmidada! Actualiza la pagina para volver a ingresar</v-alert>
        </v-container>
    </div>
</div>
</template>

<script>
import NavigationDrawer from "@/components/navigation/NavigationDrawer";
import {
    mapState
} from "vuex";

export default {
    name: "Home",
    components: {
        NavigationDrawer
    },
    data: () => ({
        interval: null
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            role: state => state.user.role,
            titleApp: state => state.titleApp,
        })
    },
    async mounted() {
        this.verifyTokenFromLS();
        console.log(this.$store.state.authToken);
    },
    methods: {
        signOut() {
            this.$store.dispatch('logout');
            location.reload();
            this.$router.push("/auth/login").catch(err => {});
        },
        async verifyTokenFromLS() {
            console.log('VERIFICANDO TOKEN');
            this.interval = setInterval(async () => {
                const dateExp =
                    localStorage.getItem('iat') ||
                    window.localStorage.getItem('iat');

                if (dateExp == 'false') {
                    clearInterval(this.interval)
                    return
                }
                const timeToExp = dateExp - new Date().getTime()
                if (timeToExp > 0 && timeToExp < (60000 * 24)) {
                    clearInterval(this.interval)
                    await this.$store.dispatch('refreshToken');
                    this.verifyTokenFromLS()
                }
            }, 5000)
        },
        redirectLogin() {
            this.$store.dispatch("logout");
            this.$router.push("/auth/login").catch(err => {});
            clearInterval(this.interval);
        },
        toggleMenu() {
            this.$store.commit("setMenuState", !this.$store.state.menu);
        }
    }
};
</script>

<style lang="scss">
.navbar-project {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

.main-content {
    width: 100%;
    min-height: 100vh;
    padding-top: 80px;
}

.main-section {
    display: flex;
}
</style>
