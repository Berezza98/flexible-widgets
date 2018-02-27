import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import routes from './routes';
import {store} from './store/store';

import VueDraggableResizable from './components/vue-draggable-resizable.vue';

Vue.component('draggable', VueDraggableResizable);

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
