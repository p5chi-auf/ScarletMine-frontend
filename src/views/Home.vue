<template>
  <div class="banner">
    <div class="app-text">
      <h1><b>Our basic thesis for time is that it is better than gold.</b></h1><br>
      <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the... </p>
    </div>
  <div class="home-buttons-wrapper">
    <a href="#" class="btn btn-primary">GET STARTED</a>
    <a href="/about" class="btn btn-outline-primary">LEARN MORE</a>
  </div>
    <div class="app-picture">
      <b-img src="/img/image.png"></b-img>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.authentication.user
    },
    users () {
      return this.$store.state.users.all
    }
  },
  created () {
    this.$store.dispatch('users/getAll')
  }
}
</script>
