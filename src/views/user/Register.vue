<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="6">
          <b-card class="p-3 text-left">
            <h2 class="mb-4 text-center">Create account</h2>
            <div class="text-center">
              <a href="/login">or sign in to your account</a>
            </div>
            <b-form @submit.stop.prevent="createUser" :novalidate="true">
              <b-form-group id="input-group-1"
                            label="Email:"
                            label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.username"
                  type="text"
                  placeholder="Enter email"
                  name="username"
                  v-validate="{ required: true, email: true }"
                  :state="validateState('username')"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">
                  <ul>
                    <li v-for="error in errors.collect('username')" :key="error">{{ error }}</li>
                  </ul>
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-2" label="Full name:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.fullName"
                  name="full name"
                  v-validate="{ required: true }"
                  :state="validateState('full name')"
                  aria-describedby="input-2-live-feedback"
                  placeholder="Enter name"
                ></b-form-input>
                <b-form-invalid-feedback id="input-2-live-feedback">
                  <ul>
                    <li v-for="error in errors.collect('full name')" :key="error">{{ error }}</li>
                  </ul>
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-3" label="Password:" label-for="text-password">
                <b-input type="password" id="text-password" aria-describedby="password-help-block"
                         placeholder="Enter password" v-model="form.newPassword"
                         name="password"
                         v-validate.continues="{ required: true, min: 3}"
                         :state="validateState('password')"
                          ref="password"></b-input>
                <b-form-invalid-feedback id="input-3-live-feedback">
                  <ul>
                    <li v-for="error in errors.collect('password')" :key="error">{{ error }}</li>
                  </ul>
                </b-form-invalid-feedback>
                <b-form-text id="password-help-block"></b-form-text>
              </b-form-group>

              <b-form-group id="input-group-4" label="Confirm password:" label-for="confirm-password">
                <b-input type="password" id="confirm-password" aria-describedby="password-help-block"
                         placeholder="Confirm password" v-model="form.confirmPassword"
                         name="confirmPassword"
                         v-validate=" 'required|confirmed:password' "
                         :state="validateState('confirmPassword')"
                         data-vv-as="password"></b-input>
                <b-form-invalid-feedback id="input-4-live-feedback">
                  <ul>
                    <li v-for="error in errors.collect('confirmPassword')" :key="error">{{ error }}</li>
                  </ul>
                </b-form-invalid-feedback>
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
      selected: [],
      form: {
        username: '',
        fullName: '',
        newPassword: '',
        roles: []
      },
      apiErrors: []
    }
  },
  computed: {
    userRoles () {
      return userService.getAllRoles()
    }
  },
  methods: {
    createUser () {
      userService.register(this.form)
        .then(() => {
          location.href = '/users'
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
