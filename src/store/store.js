import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        searchingData: "", //FOR SEARCH COMPONENT
        currentOrientation: "",
        readyForCreateWidget: false
    },
    getters: {
        getOrientation(state){
            return state.currentOrientation;
        }
    },
    mutations: {
        changeSearchingData(state, value){
            state.searchingData = value;
        },
        changeOrientation(state, value){
            state.currentOrientation = value;
        },
        createWidget(state){
            state.readyForCreateWidget = true;
        }
    }
});