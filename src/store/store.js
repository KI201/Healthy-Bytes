// store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        isAuthenticated: false,
        user: null,
    },
    mutations: {
        setAuthentication(state, status) {
            state.isAuthenticated = status;
        },
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        login({commit}, user) {
            commit('setAuthentication', true);
            commit('setUser', user);
        },
        logout({commit}) {
            commit('setAuthentication', false);
            commit('setUser', null);
        },
    },
});

// still havent linked login information to state yet
// above is how I think we will interact with firebase 