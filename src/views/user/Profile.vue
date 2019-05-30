<template>
  <div id="logged">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <router-link to="/"><i class="fas fa-home fa-lg"></i></router-link>&emsp;
        <b-navbar-brand href="#">LOGO</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>&emsp;
          <b-nav-item-dropdown right>
            <template slot="button-content"><i class="fas fa-user"></i>&nbsp;Profile</template>
            <b-dropdown-item href="#">My Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-item href="#">Help</b-dropdown-item><hr>
            <b-dropdown-item href="/login">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<style>
  i {
    color: white;
  }
</style>
