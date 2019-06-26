<template>
    <div>
        <b-container>
            <b-row align-h="center" class="mt-5">
                <b-col cols="12" md="6">
                    <b-card class="p-3 text-left">
                        <h2 class="mb-4 text-center">Add new project</h2>
                        <b-form @submit.stop.prevent="create" :novalidate="true">

                                <b-form-group id="input-group-2" label="Project name:" label-for="input-2">
                                <b-form-input
                                        id="input-2"
                                        v-model="form.name"
                                        name="name"
                                        v-validate="{ required: true }"
                                        :state="validateState('project name')"
                                        aria-describedby="input-2-live-feedback"
                                        placeholder="Enter project name"
                                ></b-form-input>
                                <b-form-invalid-feedback id="input-2-live-feedback">
                                    <ul>
                                        <li v-for="error in errors.collect('name')">{{ error }}</li>
                                    </ul>
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <div class="alert-danger" v-if="apiErrors.length">
                                <div v-for="error in apiErrors" :key="error">
                                    {{ error }}
                                </div>
                            </div>
                            <div class="text-center">
                                <b-button type="submit" variant="primary" :disabled="errors.any()">Save</b-button>&nbsp;
                            </div>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import ProjectService from '../../services/ProjectService'
let projectService = new ProjectService()

export default {
  data () {
    return {

      form: {
        name: ''
      },
      apiErrors: []
    }
  },
  methods: {
    create (evt) {
      projectService.create(this.form, 'error')
        .then((response) => {
          location.href = '/projects'
        })
        .catch((error) => {
          console.log(error.message)
          this.apiErrors = [error.message]
        })
    },
    validateState (ref) {
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.errors.has(ref) ? null : false
      }
      return null
    }
  }
}
</script>
