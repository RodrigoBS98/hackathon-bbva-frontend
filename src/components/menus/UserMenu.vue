<template>
<v-expand-x-transition>
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" max-height="320px" bottom offset-y>
        <template v-slot:activator="{ on }">
            <v-list id="menu-user-profile" class="p-0 m-0" style="border-radius: 10px">
                <v-list-item color="secondary" class="user-details" v-on="on" style="cursor: pointer; border-radius: 10px">
                    <v-list-item-avatar>
                        <img :src="user.image.url" :alt="user._id" />
                    </v-list-item-avatar>
                    <v-list-item-content class="contenido-appbar">
                        <v-list-item-title style="
                  font-size: 13px;
                  text-transform: capitalize;
                ">
                            {{ user.names
                }}<!--  {{ user.apellido_paterno }}  -->
                            <!-- {{user.apellido_materno}} -->
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <i class="material-icons" style="color: #072146;">keyboard_arrow_down</i>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </template>

        <v-card id="signout-card" height="auto" width="auto">
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <img :src="user.image.url" :alt="user._id" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title style="
                  text-transform: capitalize;
                  font-size: 13px;
                  padding-bottom: 1px;
                ">{{ user.names }} {{ user.lastNames }}
                        </v-list-item-title>
                        <v-list-item-subtitle style="
                  text-transform: capitalize;
                  font-size: 12px;
                  padding-bottom: 1px;
                ">{{ user.role.name }}
                            <!-- | {{ user.level }} -->
                        </v-list-item-subtitle>
                        <v-list-item-subtitle style="font-size: 12px">{{
                user.edad
              }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <!-- <v-divider></v-divider> 
            <ListSignOut v-on:update-menu="menu = $event" />

            -->

        </v-card>
    </v-menu>
</v-expand-x-transition>
</template>

<script>
import {
    mapState
} from 'vuex';
export default {
    data() {
        return {
            menu: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        })
    }
};
</script>

<style lang="scss" scoped>

</style>
