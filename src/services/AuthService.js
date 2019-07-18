import apiService from './ApiService'
import jwt_decode from 'jwt-decode'
import UserService from './UserService'
const userService = new UserService()
export default class AuthService {
  isLoggedIn () {
    return localStorage.getItem('jwt_token')
  }

  login (userData) {
    const response = apiService.axios().post(`${apiService.getApiUrl()}/login_check`, userData)
    return response.then((response) => {
      const data = response.data
      return new Promise((resolve, reject) => {
        if (data.token) {
          localStorage.setItem('jwt_token', data.token)
          return resolve(data)
        } else {
          throw new Error('Error from the api')
        }
      })
    })
  }

  logout () {
    localStorage.removeItem('jwt_token')
  }

  getLoggedInUser () {
    const jwtToken = localStorage.getItem('jwt_token')
    if (jwtToken) {
      const decodedJwt = jwt_decode(jwtToken)

      return userService.findByUsername(decodedJwt.username)
    }

    return null
  }
}
