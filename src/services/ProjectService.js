import apiService from './ApiService'
export default class ProjectService {
  create (projectData) {
    const response = apiService.axios().post(`${apiService.getApiUrl()}/projects`, projectData)
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
