// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios';
import iView from 'iview';
import _ from 'lodash'
import echarts from 'echarts';

import App from './App'
//路由
import router from './router'
//store
import store from './store/index'
import util from './assets/js/util'

Vue.prototype.$utils = util;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iView)

axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    // return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {

        }
    });

Vue.prototype.$axios = axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
