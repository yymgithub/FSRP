import Vue from 'vue'
import router from './router'
import '@/styles/iconfont.css';
import '@/iconfont/iconfont.js';
import '@/styles/reset.less';
import '@/styles/element-variables.less';
import ElementUI from 'element-ui';
import icon from '@/components/icon';
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI)

Vue.component('my-icon', icon);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
