export default class UserService {
  register (userData) {
    // Axios.post('/api/users/register', userData)
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line standard/object-curly-even-spacing
      // resolve({ success: true, data: userData })
      reject(new Error('Axios nu este implementat'))
    })
  }
}
