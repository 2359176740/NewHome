import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        path: '',
        name: ''

    },
    mutations: {
        setpath(state, [path]) {
            state.path = path;
        },
        setname(state, name) {
            state.name = name;
        }
    },
    actions: {},
    modules: {}
})