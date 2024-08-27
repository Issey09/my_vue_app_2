// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAuthenticated: !!localStorage.getItem('token')
    },
    mutations: {
        login(state) {
            state.isAuthenticated = true;
            localStorage.setItem('token', 'your-token');
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    },
    actions: {
        login({ commit }) {
            commit('login');
        },
        logout({ commit }) {
            commit('logout');
        }
    }
});
