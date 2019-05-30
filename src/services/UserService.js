import apiService from './ApiService'
export default class UserService {
  register (userData, type) {
    const response = apiService.axios().post(`${apiService.getApiUrl()}/user/register.${type}.json`, userData)
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

  getAll () {

  }
}
