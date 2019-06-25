<template>
<div class="profile">
  <div class="avatar">
    <b-card
      title="Full Name"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
    </b-card>
  </div>
  <div>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="General" active>
        <div class="container">
          <b-table
            stacked :items="items"
            bordered
            borderless
            fixed
          >
          </b-table>
        </div>
      </b-tab>
      <b-tab title="Edit profile">
        <b-row align-h="center" class="mt-5">
          <b-col cols="12" md="3">
            <b-card class="p-3 text-left">
        <div>
          <b-form @submit.stop.prevent>
            <b-form-group id="input-group-1" label="Full Name:" label-for="input-1">
              <b-input type="text" id="input-1"></b-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Username:" label-for="input-2">
              <b-input type="text" id="input-2" ></b-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Email:" label-for="input-3">
              <b-input type="email" id="input-3"></b-input>
            </b-form-group>
            <b-form-group id="input-group-4" label="Password:" label-for="input-4">
            <b-input type="password" id="input-4"></b-input>
            </b-form-group>
            <div class="text-center">
              <b-button type="submit" variant="primary" :disabled="errors.any()">Save</b-button>&nbsp;
            </div>
          </b-form>
        </div>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Settings">
        <div class="container">
          <h5><b>Account Details</b></h5>
          <hr>
        <a href="#">Change avatar</a><br>
        <a href="#">Change bio</a><br>
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
// import apiService from '../../services/ApiService'

export default {
  data () {
    return {
      items: [
        { fullName: 'Dickerson Macdonald', username: 'macmac', email: 'mac@gmail.com', password: '*********' }
      ]
      // methods: {
      //   userProvider () {
      //     let promise = apiService.axios().get(`${apiService.getApiUrl()}/users${this.$route.params.id}`)
      //
      //     return promise.then((response) => {
      //       return response.data
      //     }).catch(error => {
      //       console.log(error)
      //       return []
      //     })
      //   }
      // }
    }
  }
}
</script>
