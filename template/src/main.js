//import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueMoment from 'vue-moment';
import moment from 'moment';
import Vue from 'vue';

import VeeValidate from "vee-validate";
import BootstrapVue from 'bootstrap-vue';
import VueNotifications from 'vue-notifications';
import miniToastr from 'mini-toastr';
import 'vue-loaders/dist/vue-loaders.css';
import * as VueLoaders from 'vue-loaders';

import _ from 'lodash';
import GlobalComponents from '@/globalComponents';

import router from '@/router';
import store from '@/store';
import App from '@/App';

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
};

miniToastr.init({ types: toastTypes });

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb);
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
};

// Plugin setup
Vue.use(VeeValidate);
Vue.use(VueNotifications, options);
Vue.use(VueMoment, {
  moment,
});
Vue.use(BootstrapVue);
Vue.use(VueLoaders);
Vue.use(GlobalComponents);

Vue.set(Vue.prototype, '_', _);
Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: {
    App
  }
});
