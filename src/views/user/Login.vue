<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
        <b-form-input
          id="example-input-1"
          v-model="form.name"
          v-validate="{ required: true, min:2 }"
          :state="validateState('form.name')"
          aria-describedby="input-1-live-feedback"
          placeholder="Enter name"
        ></b-form-input>

        <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field and must be at least 3 characters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="example-input-group-2" label="Food" label-for="example-input-2">
        <b-form-select
          id="example-input-2"
          v-model="form.food"
          v-validate="{ required: true }"
          :options="foods"
          :state="validateState('form.foods')"
        ></b-form-select>

        <b-form-invalid-feedback id="input-2-live-feedback">
          This is a required field
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="errors.any()">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      foods: ['apple', 'orange'],
      form: {}
    }
  },
  methods: {
    veeFields: undefined,
    onSubmit () {
      // Form submit logic
    },
    validateState (ref) {
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.errors.has(ref)
      }
      return null
    }
  }
}
</script>
