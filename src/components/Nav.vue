<template>
  <b-navbar-nav>
    <b-navbar v-if="isLoggedIn" toggleable=md type="light" variant="light">
      <div class="nav-wrapper custom-container">
        <div class="nav-header">
          <b-navbar-brand id="logo" href="/"><b>SCARLET</b>MINE</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        </div>
        <div class="nav-links-wrapper ml-md-auto">
          <b-collapse id="nav-collapse" class="custom-toggle" is-nav>
            <b-navbar-nav>
              <b-navbar-nav>
                <b-nav-item href="/">HOME</b-nav-item>
                <b-nav-item href="/about">ABOUT</b-nav-item>
                <b-nav-item href="/boards">BOARDS</b-nav-item>
                <b-nav-item href="/projects">PROJECTS</b-nav-item>
                <b-nav-item href="/users">USERS</b-nav-item>
              </b-navbar-nav>
              <b-nav-item-dropdown right class="profile-dropdown">
                <template slot="button-content">PROFILE</template>
                <b-dropdown-item href="/profile"><i class="fas fa-user"></i>My Account</b-dropdown-item>
                <b-dropdown-item href="/profile"><i class="fas fa-cog"></i>Settings</b-dropdown-item>
                <b-dropdown-item href="#"><i class="fas fa-info-circle"></i>Help</b-dropdown-item>
                <hr>
                <b-dropdown-item href="#" @click="logout()"><i class="fas fa-sign-out-alt"></i>Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </div>
    </b-navbar>
<!--    <b-navbar v-if="!isLoggedIn" toggleable="lg" type="light" variant="light">-->
<!--      <span id="logo" href="#"><b>SCARLET</b>MINE</span>-->

<!--      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->
<!--      <b-collapse id="nav-collapse" class="custom-toggle" is-nav>-->
<!--      <b-navbar-nav class="nav-buttons">-->
<!--        <div id="navigation">-->
<!--          <a href="/">HOME</a>-->
<!--          <a href="/about">ABOUT</a>-->
<!--        </div>-->
<!--        <div class="log">-->
<!--          <a href="/login">LOGIN</a>-->
<!--        </div>-->
<!--        <b-button size="sm" class="btn btn-primary" href="/register">REGISTER</b-button>-->
<!--      </b-navbar-nav>-->
<!--      </b-collapse>-->
<!--    </b-navbar>-->

    <b-navbar v-if="!isLoggedIn" toggleable=md type="light" variant="light">
      <div class="nav-wrapper custom-container">
        <div class="nav-header">
          <b-navbar-brand id="logo" href="/"><b>SCARLET</b>MINE</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        </div>
        <div class="nav-links-wrapper ml-md-auto">
          <b-collapse id="nav-collapse" class="custom-toggle" is-nav>
              <b-navbar-nav>
<!--                <b-nav-item href="/">HOME</b-nav-item>-->
                <b-nav-item href="/about">ABOUT</b-nav-item>
                <b-nav-item href="/login">LOGIN</b-nav-item>
                <li class="nav-item"><b-button size="sm" class="btn btn-primary" href="/register">REGISTER</b-button></li>
              </b-navbar-nav>
          </b-collapse>
        </div>
      </div>
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
