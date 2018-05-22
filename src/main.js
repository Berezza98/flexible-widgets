import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import VueMaterial from 'vue-material';
import AsyncComputed from 'vue-async-computed'
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import 'element-ui/lib/theme-chalk/index.css';
import 'vue-material/dist/vue-material.css';


import routes from './routes';
import {store} from './store/store';

import VueDraggableResizable from './components/vue-draggable-resizable.vue';

export const eventBus = new Vue();

Vue.component('draggable', VueDraggableResizable);

Vue.use(VueResource);
Vue.use(AsyncComputed);
Vue.use(VueRouter);
Vue.use(VueMaterial);

locale.use(lang);
Vue.use(ElementUI);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
