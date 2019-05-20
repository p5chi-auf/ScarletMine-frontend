import './assets/source/sass/style.scss'
import router from './router'
import store from './store'
import App from './App.vue'

import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
