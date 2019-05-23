import axios from 'axios'
import apiService from './ApiService'

export default class AuthService {
  login (userData, type) {
    const response = axios.post(`${apiService.getApiUrl()}/user/login.${type}.json`, userData)
    return response.then((response) => {
      return new Promise((resolve, reject) => {
        if (response.success) {
          return resolve(response)
        } else {
          throw new Error('Error from the api')
        }
      })
    })
  }
}
