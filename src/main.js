// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
const fb = require('./config/firebaseConfig.js')

Vue.config.productionTip = false;

/* eslint-disable no-new */
//handle page reloads
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
