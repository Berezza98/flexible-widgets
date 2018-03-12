import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import VueMaterial from 'vue-material';

import 'element-ui/lib/theme-chalk/index.css';
import 'vue-material/dist/vue-material.css';


import routes from './routes';
import {store} from './store/store';

import VueDraggableResizable from './components/vue-draggable-resizable.vue';

Vue.component('draggable', VueDraggableResizable);

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueMaterial);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
