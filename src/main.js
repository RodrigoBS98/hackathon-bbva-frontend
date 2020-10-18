import configHeaderToken from './libs/configHeaderToken';
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios';
import Vue from 'vue'

Vue.config.productionTip = false



const userConected = async() => {
    try {
        const token = localStorage.getItem('token') || window.localStorage.getItem('token');
        if (!token) return store.dispatch('logout');
        const baseUrl = store.state.baseURL;
        const config = configHeaderToken(token);
        const res = await axios.get(`${baseUrl}/api/auth/profile`, config);
        if (res.status !== 200) return store.dispatch('logout');
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const main = async() => {
    const data = await userConected();
    if (data !== null) {
        store.commit('setCurrentUser', data.user);
        store.commit('setNavUser', data.navItems);
    } else {
        store.dispatch('logout');
    }
    console.log('montando vue');
    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
}

main();