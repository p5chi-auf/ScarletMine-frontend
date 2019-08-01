<template>
<div class="profile">
  <div class="avatar-wrapper">
    <div class="card-avatar">
      <b-card>
        <avatar
          :fullname="user.fullName"
          :size="116"></avatar>
        <b-card-title>{{ user.fullName }}</b-card-title>
        <b-card-text>
          <p class="mt-3 mb-0">{{ text }}</p>
        </b-card-text>
      </b-card>
    </div>
  </div>
  <div>
    <b-tabs content-class="pt-3 tab-content-container" align="center">
      <b-tab title="General" active>
        <div class="profile-info">
          <b>Email:</b>  {{ user.email }} <br>
          <b>Full Name:</b> {{ user.fullName }} <br>
          <b>Username:</b> {{ user.username }} <br>
          <b>Role:</b> <span class="badge badge-secondary user-role" v-for="role in user.roles " @key="role">{{ role.text }}</span>

        </div>
      </b-tab>
      <b-tab title="Edit profile">
        <b-row align-h="center" >
          <b-col cols="12" md="3">
            <b-card class="p-3 text-left">
        <div>
          <b-form @submit.stop.prevent="updateUser" :novalidate="true">
            <b-form-group id="input-group-1" label="Full name:" label-for="input-1">
              <b-input
                name="full name"
                v-model="user.fullName"
                type="text"
                id="input-1"
                v-validate="{ required: true }"
                :state="validateState('full name')">
              </b-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                <ul>
                  <li v-for="error in errors.collect('full name')" :key="error">{{ error }}</li>
                </ul>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-11" label="Username:" label-for="input-11">
              <b-input
                name="username"
                v-model="user.username"
                type="text"
                id="input-11"
                v-validate="{ required: true }"
                :state="validateState('username')">
              </b-input>
              <b-form-invalid-feedback id="input-11-live-feedback">
                <ul>
                  <li v-for="error in errors.collect('username')" :key="error">{{ error }}</li>
                </ul>
              </b-form-invalid-feedback>
            </b-form-group>


            <b-form-group id="input-group-3" label="Email:" label-for="input-3">
              <b-input
                v-model="user.email"
                name="email"
                type="email"
                id="input-3"
                v-validate="{ required: true, email: true  }"
                :state="validateState('email')">
              </b-input>
              <b-form-invalid-feedback id="input-3-live-feedback">
                <ul>
                  <li v-for="error in errors.collect('email')" :key="error">{{ error }}</li>
                </ul>
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="password" label="New Password:" label-for="input-4">
              <b-input
                v-model="user.newPassword"
                name="password"
                type="password"
                id="input-4"
                v-validate.continues="{ min: 3}"
                :state="validateState('password')"
                ref="password">
              </b-input>
              <b-form-invalid-feedback id="password-live-feedback">
                <ul>
                  <li v-for="error in errors.collect('password')" :key="error">{{ error }}</li>
                </ul>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="confirm-password" label="Confirm Password:" label-for="input-5">
              <b-input
                v-model="user.confirmPassword"
                name="confirmPassword"
                type="password"
                id="input-5"
                v-validate=" 'required|confirmed:password' "
                :state="validateState('confirmPassword')"
                data-vv-as="password">
              </b-input>
              <b-form-invalid-feedback id="confirm-password-live-feedback">
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
              <b-button type="submit" variant="primary" :disabled="errors.any()">Save</b-button>&nbsp;
            </div>
          </b-form>
        </div>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab id="settings" title="Settings">
        <div class="container">
          <h5><b>Account Details</b></h5>
          <hr>
        <a href="#" @click="$bvToast.show('example2-toast')">Change avatar</a><br>
          <b-toast id="example2-toast" title="Change avatar..." static no-auto-hide>
                <b-form-file
                  v-model="file"
                  :state="Boolean(file)"
                  placeholder="Choose a file..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
            <div class="text-left">
              <br>
              <b-button type="submit" variant="primary" :disabled="errors.any()">Save</b-button>&nbsp;
            </div>
          </b-toast>

        <a href="#" @click="$bvToast.show('example1-toast')">Change bio</a><br>
          <b-toast id="example1-toast" title="Change bio..." static no-auto-hide>
            <b-form-textarea
              id="textarea"
              v-model="text"
              placeholder="Add more information about yourself"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            <div class="text-left">
              <br>
              <b-button type="submit" variant="primary" :disabled="errors.any()">Save</b-button>&nbsp;
            </div>
          </b-toast>

        <a href="#">Change language</a>

          <h5><b>Notifications</b></h5>
          <hr>
          <a href="#">Allow desktop notifications</a>

          <h5><b>Two Factor Authentication</b></h5>
          <hr>
          <a href="#">Configure Two Factor Authentication</a>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</div>
</template>

<script>
import Avatar from 'vue-avatar-component'
// import apiService from '../../services/ApiService'
import UserService from '../../services/UserService'
import AuthService from '../../services/AuthService'
const userService = new UserService()
const authService = new AuthService()

export default {
  data () {
    return {
      user: {},
      text: '',
      field: [],
      apiErrors: [],
      file: null
    }
  },
  mounted () {
    this.getUser()
  },
  components: { Avatar },
  methods: {
    userProvider () {
      return userService.getAll()
        .catch(error => {
          console.log(error)
          return []
        })
    },
    getUser () {
      const currentUserPromise = authService.getLoggedInUser()
      if (currentUserPromise) {
        currentUserPromise
          .then(user => {
            console.log(user)
            this.user = user
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    updateUser () {
      userService.updateUser(this.user.id, this.user)
        .then(() => {
          this.$bvToast.toast(`Your profile was changed`, {
            title: 'Success',
            autoHideDelay: 5000,
            variant: 'success',
            appendToast: true
          })
        })
        .catch(() => {
          this.$bvToast.toast(`Oops!..Something went wrong`, {
            title: 'Error',
            autoHideDelay: 5000,
            variant: 'danger',
            appendToast: true
          })
        })
    },
    updatePassword () {
      userService.updateUser(this.user.id, this.user).then(() => {
        this.$router.push({ name: 'profile' })
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
