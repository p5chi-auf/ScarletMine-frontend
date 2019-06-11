import apiService from './ApiService'
export default class UserService {
  register (userData) {
    const response = apiService.axios().post(`${apiService.getApiUrl()}/users`, userData)
    return response.then((response) => {
      return new Promise((resolve) => {
        if (response.statusText === 'OK') {
          return resolve(response)
        } else {
          throw new Error('Error from the api')
        }
      })
    })
  }

  getAll () {

  }
}
