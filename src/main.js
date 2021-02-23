import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';
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
import Antd from 'ant-design-vue';
import VueClipboard from 'vue-clipboard2';
import Utils from './Utils';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$utils = Utils;
Vue.use(router);
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.use(Antd);
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
//需要全局注册的组件
Vue.component('my-icon', icon);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
