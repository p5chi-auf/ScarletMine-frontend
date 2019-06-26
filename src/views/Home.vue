<template>
  <div class="home-buttons-wrapper">
    <a href="#" class="btn btn-primary">GET STARTED</a>
    <a href="/about" class="btn btn-outline-primary">LEARN MORE</a>
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
