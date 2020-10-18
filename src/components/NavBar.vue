<template>
<div id="navbar">
    <nav app id="nav" style="margin-left: 0px; padding-left: 0px;">
        <div id="mi-nabvar">
            <v-toolbar app dark color="#000">
                <v-toolbar-title>
                    <v-app-bar-nav-icon id="btn-hambuger" color="white" class="grey--text" @click="drawer = true"></v-app-bar-nav-icon>
                </v-toolbar-title>

                <v-divider class="mx-4" vertical></v-divider>

                <v-toolbar-title class="text white--text">
                    <span>Dynamo Data</span>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn :to="`/users`" depressed>Registrar Usuario</v-btn>
                    <v-btn :to="`/roles`" depressed>Registrar Rol</v-btn>
                    <v-divider vertical></v-divider>
                </v-toolbar-items>

                <!-- <v-app-bar-nav-icon @click="CerrarSession()"><v-icon @click="CerrarSession()">mdi-ghost-off</v-icon> </v-app-bar-nav-icon> -->
            </v-toolbar>
        </div>
        <v-card>
            <v-navigation-drawer app v-model="drawer" dark clipped color="#000000">
                <v-layout class="mt-5" column align-center>
                    <v-flex class="mt-12">
                        <v-avatar size="100">
                            <img id="img" src="../assets/profile.png">
                        </v-avatar>
                    </v-flex>
                </v-layout>
                <v-divider class="mt-2"></v-divider>
                <v-divider></v-divider>
                <v-list dense>
                    <v-list-item-group>
                        <v-list-item color="#007bff">
                            <v-list-item-action>
                                <v-icon>mdi-dashboard</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Mi Perfil</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item color="#007bff">
                            <v-list-item-action>
                                <!-- <v-icon>dashboard</v-icon> -->
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Dashboard 1</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item color="#007bff">
                            <v-list-item-action>
                                <!-- <v-icon>dashboard</v-icon> -->
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>DashBoard 2</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item color="#007bff">
                            <v-list-item-action>
                                <!-- <v-icon>perm_identity</v-icon> -->
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Dashboard 4</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </nav>
</div>
</template>

<script>
export default {
    data: () => ({
        drawer: false
    })
}
</script>

<style>
#subtitle {
    font-size: 12px;
}

#navbar {
    padding: 0px;
    margin: 0px;
}

#mi-nabvar {
    position: fixed;
    width: 100%;
    z-index: 10;
}
</style>
