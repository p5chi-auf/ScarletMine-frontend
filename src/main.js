import './assets/source/sass/style.scss'
import router from './router'
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  events: 'blur'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
