import Vue from 'vue';
import Vuex from 'vuex';

import mainModule from './modules/mainModule';
import activeElement from './modules/activeElement';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    modules: {
        main: mainModule,
        activeElement
    }
});