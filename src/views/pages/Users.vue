<template>
<div>
    <div>
        <v-card class="mx-auto" style="margin-top: 250px;" max-width="450">
            <v-card-title>
                <span class="headline">Registrar Usuario</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex>
                            <v-text-field label="Nombre y Apellido"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Correo"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-combobox v-model="roles" :items="items" label="Seleccionar Rol"></v-combobox>
                        </v-flex>
                    </v-layout>
                    <v-btn depressed>Registrar</v-btn>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</div>
</template>

<script>
export default {

}
</script>
