<template>
  <div id="home">
  <div class="button">
<a href="#" class="btn btn-one">GET STARTED</a>
<a href="/about" class="btn btn-two">LEARN MORE</a>
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
