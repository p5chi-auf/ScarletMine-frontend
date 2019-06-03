import Vue from 'vue'
import Vuex from 'vuex'
import { alert } from './store/alert.module'
import { authentication } from './store/authentication.module'
import { users } from './store/users.module'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null
  },
  getters: {
    isLoggedIn (state) {
      return state.accessToken !== null
    }
  },
  mutations: {},
  actions: {
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          username: credentials.username,
          password: credentials.password
        })
          .then(response => {
            const accessToken = response.data.token

            localStorage.setItem('jwt_token', accessToken)
            context.commit('retrieveToken', accessToken)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  modules: {
    alert,
    authentication,
    users
  }
})
