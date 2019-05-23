<template>
  <div class="login">
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <b-card class="p-3">
            <h3 class="mb-4">Log In</h3>
            <b-form @submit.prevent="login" v-if="show" :novalidate="false">
              <b-form-group align="left" id="exampleInputGroup1"
                            label="Email address:"
                            label-for="exampleInput1"
              >
                <b-form-input id="exampleInput1"
                              type="email"
                              v-model="form.email"
                              placeholder="Enter email"
                              name="form.email"
                              v-validate="{ required: true, email: true }"
                              :state="validateState('form.email')">
                </b-form-input>
              </b-form-group>
              <b-form-group align="left" id="exampleInputGroup2"
                            label="Password:"
                            label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="password"
                              v-model="form.password"
                              placeholder="Enter password"
                              name="form.Password"
                              v-validate="{ required: true, min: 6 }"
                              :state="validateState('form.Password')">
                </b-form-input>
              </b-form-group>
              <b-form-group id="exampleGroup4">
                <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                  <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <div class="alert-danger" v-if="apiErrors.length">
                <div v-for="error in apiErrors" :key="error">
                  {{ error }}
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div>
                  <b-button type="submit" variant="primary" :disabled="errors.any()">Log In</b-button>&nbsp;
                  <a href="/register">Register</a>
                </div>
                <div>
                  <a href="#">Forgot Password!</a>
                </div>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService'
const authService = new AuthService()
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      apiErrors: [],
      show: true
    }
  },
  methods: {
    login (evt) {
      authService.login(this.form, 'error')
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error.message)
          this.apiErrors = [error.message]
        })
    },
    validateState (ref) {
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.errors.has(ref) ? null : false
      }
      return null
    }
  }
}
</script>
