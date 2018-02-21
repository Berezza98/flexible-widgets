import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        searchingData: ""
    },
    mutations: {
        changeSearchingData(state, value){
            state.searchingData = value;
        }
    }
});