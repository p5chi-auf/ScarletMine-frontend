<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <b-card class="p-3">
            <h3 class="mb-4">Log In</h3>
            <b-form @submit="login" v-if="show">
              <b-form-group align="left" id="exampleInputGroup1"
                            label="Email address:"
                            label-for="exampleInput1"
              >
                <b-form-input id="exampleInput1"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="Enter email">
                </b-form-input>
              </b-form-group>
              <b-form-group align="left" id="exampleInputGroup2"
                            label="Password:"
                            label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="password"
                              v-model="form.password"
                              required
                              placeholder="Enter password">
                </b-form-input>
              </b-form-group>
              <b-form-group id="exampleGroup4">
                <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                  <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <div class="d-flex justify-content-between">
                <div>
                  <b-button type="submit" variant="primary">Log In</b-button>&nbsp;
                  <a href="#" >Register</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="#" >Forgot Password!</a>
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
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
    login (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    }
  }
}
</script>
