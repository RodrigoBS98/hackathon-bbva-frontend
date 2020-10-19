import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify)

export default new Vuetify({
    lang: {
        locales: { es },
        current: "es",
    },
    theme: {
        themes: {
            light: {
                primary: '#006ec1',
                secondary: '#072146',
                white: '#fff'
            },
            dark: {
                primary: '#006ec1',
                secondary: '#072146',
                white: '#fff'
            }
        },
    },
})