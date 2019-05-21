
<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="3">
          <b-card class="p-3">
            <h3 class="mb-4">Register</h3>
            <b-form @submit="register" @reset="onReset" v-if="show" @submit.stop.prevent>
              <b-form-group align="left"
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group align="left" id="input-group-2" label="Full name:" label-for="input-2">

                <b-form-input
                  id="input-2"
                  v-model="form.fullName"
                  required
                  placeholder="Enter name"
                ></b-form-input>&nbsp;
                <div>
                  <label for="text-password">Password:</label>
                </div>
                <b-input type="password" id="text-password" aria-describedby="password-help-block"
                         placeholder="Enter password" v-model="form.newPassword"></b-input>
                <b-form-text id="password-help-block">
                                </b-form-text> &nbsp;
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <div>{{ error }}</div>
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
        fullName: '',
        newPassword: ''
      },
      show: true,
      error: ''
    }
  },
  methods: {
    register (evt) {
      // alert(JSON.stringify(this.form))
      userService.register(this.form)
        .then((response) => {
          console.log(response)
        })
      //   .catch((error) => {
      //   this.error = 'A aparut o eroare'
      // })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
