import Vue from 'vue';
import router from './router';
import axios from 'axios';
import '@/styles/iconfont.css';
import '@/iconfont/iconfont.js';
import '@/styles/reset.less';
import '@/styles/element-variables.less';
import ElementUI from 'element-ui';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import icon from '@/components/icon';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(router)
Vue.use(ElementUI)
Vue.use(ViewUI)

Vue.component('my-icon', icon);
// Vue.component(List.name, List)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
