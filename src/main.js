import "babel-polyfill";
import "./polyfills.js";

import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import VueMaterial from 'vue-material';
import AsyncComputed from 'vue-async-computed'
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import VueCookie from 'vue-cookie';

import 'element-ui/lib/theme-chalk/index.css';
import 'vue-material/dist/vue-material.css';

import {store} from './store/store';
import translations from './data/translations';

import VueDraggableResizable from './components/vue-draggable-resizable.vue';

export const eventBus = new Vue();

Vue.component('draggable', VueDraggableResizable);

Vue.use(VueI18n);

Vue.use(VueResource);
Vue.use(AsyncComputed);
Vue.use(VueMaterial);
Vue.use(VueCookie);

locale.use(lang);
Vue.use(ElementUI);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: 'en',
  messages : translations
});

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');