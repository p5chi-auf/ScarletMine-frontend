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

  updateProject (projectId, projectData) {
    projectData = this.transformForApi(projectData)
    const response = apiService.axios().post(`${apiService.getApiUrl()}/projects/${projectId}`, projectData)

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
    let promise = apiService.axios().get(`${apiService.getApiUrl()}/projects`)
    return promise
      .then(response => {
        let projects = response.data.map((project) => {
          return this.transformForFront(project)
        })
        return new Promise((resolve, reject) => {
          return resolve(projects)
        })
      })
  }

  transformForApi (project) {
    return project
  }

  transformForFront (project) {
    return project
  }

  findById (projectId) {
    return this.getAll()
      .then((projects) => {
        let foundProject = projects.find((project) => {
          return projectId === project.id
        })

        return new Promise((resolve, reject) => {
          return resolve(foundProject)
        })
      }).catch(error => {
        console.log(error)
        return []
      })
  }
}
