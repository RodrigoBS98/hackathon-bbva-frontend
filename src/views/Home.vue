<template>
<div class="home">
    <div v-if="user">
        <v-app-bar id="menu-app-bar" style="height: 90px; display: flex; align-items: center; width: 100%; justify-content: space-between;" fixed color="white">
            <v-container fluid class="w-100">
                <v-row class="d-flex justify-content-between align-items-center">
                    <div class="title-section">
                        <div class="title-app">
                            {{titleApp}}
                        </div>
                        <span>{{hashtag}}</span>
                    </div>

                    <div class="search-section">
                        <v-form class="search-container">
                            <button>
                                <i class="material-icons">search</i>
                            </button>
                            <input placeholder="Search" type="text">
                        </v-form>
                    </div>
                    <div class="d-flex align-items-center item-name-menu">
                        <div class="d-flex">
                            <v-btn @click="signOut" icon>
                                <i class="material-icons">power_settings_new</i>
                            </v-btn>
                        </div>
                        <UserMenu />
                        <v-app-bar-nav-icon id="hamburger-menu" @click="toggleMenu"></v-app-bar-nav-icon>
                    </div>
                </v-row>
            </v-container>
        </v-app-bar>
        <div class="main-section">
            <NavigationDrawer />
            <v-main style="height: 200vh;">
                <v-container fluid>
                    <v-flex shrink>
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
import UserMenu from '@/components/menus/UserMenu';
import {
    mapState
} from "vuex";

export default {
    name: "Home",
    components: {
        NavigationDrawer,
        UserMenu
    },
    data: () => ({
        interval: null
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            role: state => state.user.role,
            titleApp: state => state.titleApp,
            hashtag: state => state.hashtag
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
                if (timeToExp > 0 && timeToExp < (20000)) {
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
button {
    outline: none !important;
}

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

.item-name-menu {
    margin-right: 30px;
}

.v-main {
    margin-top: 90px;
    margin-left: 0;
}

@media screen and (min-width: 960px) {
    .main-section {
        display: flex;

        aside.v-navigation-drawer--open~.v-main {
            margin-top: 90px;
            margin-left: 255px;
        }

        aside.v-navigation-drawer--mini-variant~.v-main {
            margin-top: 90px;
            margin-left: 56px;
        }

        aside.v-navigation-drawer--close~.v-main {
            margin-top: 90px;
            margin-left: 0px !important;
        }
    }
}

.v-toolbar__content {
    flex: 1
}

.title-section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-top: .3em;
    width: calc(250px - 20px);

    .title-app {
        font-size: 17px;
        font-weight: 600;
        color: #1390ca;
        display: flex;
        align-items: center;
        padding: .22em .8em;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 3px solid #1390ca;

        }

    }

    span {
        font-size: 12px;
        margin-top: 4px;
    }
}

#hamburger-menu {
    display: none;
}

@media screen and (max-width: 1100px) {
    .search-container {
        max-width: 400px !important;
        width: 400px !important;
    }
}

@media screen and (max-width: 959px) {
    #hamburger-menu {
        display: block;
    }

    .search-container {
        max-width: 300px !important;
        width: 300px !important;
    }
}

@media screen and (max-width: 845px) {
    .search-section {
        display: none !important;
    }
}

@media screen and (max-width: 600px) {
    .title-section {
        width: auto !important;
    }

    .item-name-menu {
        margin-right: 0px !important;
    }
}

@media screen and (max-width: 550px) {
    #menu-app-bar {
        height: 70px !important;
    }

    .v-main {
        margin-top: 70px;
        margin-left: 0;
    }
}

@media screen and (max-width: 460px) {
    #menu-user-profile {
        display: none !important;
    }

    .title-app {
        font-size: 15px !important;
        font-weight: 600 !important;
        padding: .2em .7em !important;
    }

    .title-section span {
        font-size: 11px !important;
    }
}

.search-section {
    height: 100%;
    display: flex;
    align-items: center;

    .search-container {
        max-width: 600px;
        width: 600px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: .4em 1.5em;
        border: 1px solid #ccc;

        button,
        input {
            outline: none;
        }

        button {
            display: flex;
            align-items: center;

            i {
                color: #ccc;
            }
        }

        input {
            padding: .3em .5em;
            width: 100%;
        }
    }
}
</style>
