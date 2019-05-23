<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <b-card class="p-3 text-left">
            <h3 class="mb-4 text-center">Register</h3>
            <b-form @submit.stop.prevent="register" :novalidate="true">
              <b-form-group id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  name="form.email"
                  v-validate="{ required: true, email: true }"
                  :state="validateState('form.email')"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">
                  It doesn't look like an email address ...
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-2" label="Full name:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.name"
                  name="form.name"
                  v-validate="{ required: true, min: 3 }"
                  :state="validateState('form.name')"
                  aria-describedby="input-2-live-feedback"
                  placeholder="Enter name"
                ></b-form-input>
                <b-form-invalid-feedback id="input-2-live-feedback">
                  This is a required field and must be at least 3 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-3" label="Password:" label-for="text-password">
                <b-input type="password" id="text-password" aria-describedby="password-help-block"
                         placeholder="Enter password" v-model="form.newPassword"
                         name="form.newPassword"
                         v-validate="{ required: true, min: 8 }"
                         :state="validateState('form.newPassword')"></b-input>
                <b-form-invalid-feedback id="input-3-live-feedback">
                  This is a required field and must be at least 8 characters
                </b-form-invalid-feedback>
                <b-form-text id="password-help-block"></b-form-text> &nbsp;
              </b-form-group>
              <div class="alert-danger" v-if="apiErrors.length">
                <div v-for="error in apiErrors" :key="error">
                  {{ error }}
                </div>
              </div>
              <div class="text-center">
                <b-button type="submit" variant="primary" :disabled="errors.any()">Register</b-button>&nbsp;
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
let userService = new UserService()

export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        newPassword: ''
      },
      apiErrors: []
    }
  },
  methods: {
    register (evt) {
      userService.register(this.form, 'error')
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
