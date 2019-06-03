<template>
  <b-navbar v-if="isLoggedIn" toggleable="lg" type="dark" variant="dark">
    <router-link to="/"><i class="fas fa-home fa-lg"></i></router-link>&emsp;
    <b-navbar-brand href="#">LOGO</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>&emsp;
      <b-nav-item-dropdown right>
        <template slot="button-content">Profile</template>
        <b-dropdown-item href="/profile"><i class="fas fa-user"></i>&nbsp;My Account</b-dropdown-item>
        <b-dropdown-item href="#"><i class="fas fa-cog"></i>&nbsp;Settings</b-dropdown-item>
        <b-dropdown-item href="#"><i class="fas fa-info-circle"></i>&nbsp;Help</b-dropdown-item><hr>
        <b-dropdown-item href="#" @click="logout()"><i class="fas fa-sign-out-alt"></i>&nbsp;Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>

import AuthService from '../services/AuthService'
const authService = new AuthService()

export default {
  name: 'Nav',
  computed: {
    isLoggedIn () {
      return authService.isLoggedIn()
    }
  },
  methods: {
    logout () {
      authService.logout()
      location.href = '/login'
    }
  }
}
</script>
