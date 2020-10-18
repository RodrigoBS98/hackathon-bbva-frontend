import configHeaderToken from '../libs/configHeaderToken';
import defaultImage from '../assets/img/default-image.jpg';
import axios from 'axios';
import Vuex from 'vuex'
import Vue from 'vue'

axios.interceptors.response.use(
    function(response) { return response },
    function(error) { return error.response || error }
)

//Modules
import baseData from './baseData'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseURL: 'http://localhost:3200',
        titleApp: 'DYNAMIC DATA',
        hashtag: '#HACKATHONBBVA2020',
        authToken: localStorage.getItem('token'),
        iat: localStorage.getItem('iat'),
        navUser: [],
        user: null,
        menu: true,
        defaultImage: defaultImage
    },
    mutations: {
        setCurrentUser(state, user) {
            state.user = user;
        },
        setAuthToken(state, token) {
            state.authToken = token;
        },
        setIatToken(state, iat) {
            state.iat = iat;
        },
        setMenuState(state, bool) {
            state.menu = bool;
        },
        setNavUser(state, list) {
            state.navUser = list
        }
    },
    getters: {
        getMenu(state) {
            return state.menu
        }
    },
    actions: {
        async login({ state, commit, dispatch }, authPayload) {
            const res = await axios.post(`${state.baseURL}/api/auth/signin`, authPayload);
            if (res.status != 200) return res;
            dispatch('replaceTokenAndIat', res.data);
            const config = configHeaderToken(res.data.token);
            const { user, navItems } = (await axios.get(`${state.baseURL}/api/auth/profile`, config)).data;
            commit('setCurrentUser', user);
            commit('setNavUser', navItems);
            console.log(user, navItems);
            return res;
        },
        async refreshToken({ commit, state, dispatch }) {
            console.log(state.authToken);
            const config = configHeaderToken(state.authToken);
            const res = await axios.put(`${state.baseURL}/api/auth/refresh`, {}, config);
            if (res.status != 200) return false;
            dispatch('replaceTokenAndIat', res.data);
            return true;
        },
        replaceTokenAndIat({ state, commit }, data) {
            console.log(data);
            commit('setAuthToken', data.token);
            commit('setIatToken', data.iat);
            localStorage.setItem('token', data.token);
            localStorage.setItem('iat', data.iat);
        },
        logout({ commit, state }) {
            commit('setCurrentUser', null);
            commit('setAuthToken', null);
            commit('setIatToken', null);
            localStorage.removeItem('token');
            localStorage.removeItem('iat');
            localStorage.removeItem('optc');
            localStorage.removeItem('test');
            return null;
        },
    },
    modules: {
        baseData: baseData
    }
})