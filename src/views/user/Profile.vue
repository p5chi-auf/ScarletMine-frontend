<template>
  <div class="container">
    <b-table stacked :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' }
      ]
    }
  }
}
</script>
