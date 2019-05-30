import apiService from './ApiService'

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

  // handleResponse (response) {
  //   return response.text().then(text => {
  //     if (!response.ok) {
  //       if (response.status === 401) {
  //         // auto logout if 401 response returned from api
  //         logout ()
  //         location.reload(true)
  //       }
  //
  //       const error = (data && data.message) || response.statusText
  //       return Promise.reject(error)
  //     }
  //
  //     return data
  //   })
  // }
}
