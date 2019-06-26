import apiService from './ApiService'
export default class UserService {
  createUser (userData) {
    userData = this.transformForApi(userData)

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

  updateUser (userId, userData) {
    userData = this.transformForApi(userData)
    const response = apiService.axios().post(`${apiService.getApiUrl()}/users/${userId}`, userData)

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
    let promise = apiService.axios().get(`${apiService.getApiUrl()}/users`)
    return promise
      .then(response => {
        let users = response.data.map((user) => {
          return this.transformForFront(user)
        })

        return new Promise((resolve, reject) => {
          return resolve(users)
        })
      })
  }

  transformForApi (user) {
    user.roles = user.roles.map(role => {
      return role.value
    })

    return user
  }

  transformForFront (user) {
    const transformedRoles = user.roles.map(role => {
      return this.getAllRoles().find(multiSelectRole => {
        return multiSelectRole.value === role
      })
    })

    user.roles = transformedRoles

    return user
  }

  findById (userId) {
    return this.getAll()
      .then((users) => {
        let foundUser = users.find((user) => {
          return userId === user.id
        })

        return new Promise((resolve, reject) => {
          return resolve(foundUser)
        })
      }).catch(error => {
        console.log(error)
        return []
      })
  }

  getAllRoles () {
    return [
      { value: 'ROLE_ADMIN', text: 'Admin' },
      { value: 'ROLE_USER', text: 'User' }
    ]
  }
}
