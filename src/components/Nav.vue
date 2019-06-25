<template>
  <b-navbar-nav>
    <b-navbar v-if="isLoggedIn" toggleable="lg" type="dark" variant="light">
      <b-navbar-brand id="logo" href="#"><b>SCARLET</b>MINE</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav class="form-inline">
        <form>
          <a class="nav-buttons-logged" href="/">HOME</a>
          <a class="nav-buttons-logged" href="/about">ABOUT</a>
          <a class="nav-buttons-logged" href="/projects">PROJECTS</a>
          <a class="nav-buttons-logged" href="/users">USERS</a>
        </form>
        <b-nav-item-dropdown right>
          <template slot="button-content">PROFILE</template>
          <b-dropdown-item href="/profile"><i class="fas fa-user"></i>My Account</b-dropdown-item>
          <b-dropdown-item href="#"><i class="fas fa-cog"></i>Settings</b-dropdown-item>
          <b-dropdown-item href="#"><i class="fas fa-info-circle"></i>Help</b-dropdown-item>
          <hr>
          <b-dropdown-item href="#" @click="logout()"><i class="fas fa-sign-out-alt"></i>Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-navbar v-if="!isLoggedIn" toggleable="lg" type="dark" variant="light">
      <span id="logo" href="#"><b>SCARLET</b>MINE</span>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav class="nav-buttons">
        <div id="navigation">
          <a href="/">HOME</a>
          <a href="/about">ABOUT</a>
        </div>
        <div class="log">
          <a href="/login">LOGIN</a>
        </div>
        <b-button size="sm" squared href="/register">REGISTER</b-button>
      </b-navbar-nav>
    </b-navbar>
  </b-navbar-nav>
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
      location.href = '/'
    }
  }
}
</script>
