import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    //these are global states
    state: {
        token: null,
        user: null,
        loggedIn: false
    },
    mutations: {
        setToken(state, token){
            state.token = token
            if (token){
                state.loggedIn = true
            }else{
                state.loggedIn = false
            }
        },
        setUser(state, user){
            state.user = user
        }
    }, 
    actions: {
        setToken({commit}, token){
            commit('setToken', token)
        },
        setUser({commit}, user){
            commit('setToken', user)
        }
    }
})