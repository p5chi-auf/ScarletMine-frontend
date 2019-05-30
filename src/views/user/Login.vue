<template>
  <div class="login">
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="6">
          <b-card class="p-3">
            <h3 class="mb-4">Log In</h3>
            <b-form @submit.prevent="login" v-if="show" :novalidate="true">
              <b-form-group align="left" id="exampleInputGroup1"
                            label="Username:"
                            label-for="exampleInput1"
              >
                <b-form-input id="exampleInput1"
                              type="text"
                              v-model="form.username"
                              placeholder="Enter username"
                              name="form.username"
                              v-validate="{ required: true }"
                              :state="validateState('form.username')">
                </b-form-input>
                <b-form-invalid-feedback id="exampleInput1-live-feedback">
                  Username request!
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group align="left" id="exampleInputGroup2"
                            label="Password:"
                            label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="password"
                              v-model="form.password"
                              placeholder="Enter password"
                              name="form.Password"
                              v-validate="{ required: true }"
                              :state="validateState('form.Password')">
                </b-form-input>
                <b-form-invalid-feedback id="exampleInput2-live-feedback">
                  Password request!
                </b-form-invalid-feedback>
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
        username: '',
        password: '',
        checked: []
      },
      apiErrors: [],
      show: true
    }
  },
  methods: {
    login () {
      authService.login(this.form, 'error')
        .then(() => {
          location.href = '/'
        })
        .catch((error) => {
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
