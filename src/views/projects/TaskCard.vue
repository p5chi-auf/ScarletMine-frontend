<template>
  <b-container>
    <b-row align-h="center" class="mt-5">
      <b-col cols="12" md="8">
        <b-card >
          <div class="window-wrapper">
            <a class="close-window" href="/projects/tasks"><i class="fas fa-times"></i></a>
            <div class="title-wrapper">
              <div class="window-title">
                <h5 ><i class="far fa-credit-card"></i><b>Task-Title</b></h5>
              </div>
              <div class="project-title">
                <h5>(Project name)</h5>
              </div>
            </div>
            <div class="list-status">
              <p>status:</p>
            </div>
            <div class="window-main-col">
              <div class="member-list">
                <h5><i class="fas fa-user-friends"></i><b>MEMBERS</b></h5>
                <p>created by:</p>
                <div>
                  <avatar
                    fullname="M B"
                    size="34"></avatar>
                </div>
              </div>
              <div class="card-description">
                <h5><i class="fas fa-stream"></i><b>Description</b></h5>
                <textarea class="textarea-field-description" placeholder="Add a more detailed description…"></textarea>
                <div class="edit-controls">
                  <b-button type="submit" variant="primary" :disabled="errors.any()">Save</b-button>&nbsp;
                  <a class="close-button" href="#"><i class="fas fa-times"></i></a>
                </div>
              </div>
            </div>

            <div class="window-sidebar">
              <h5><b>ADD TO CARD</b></h5>
              <div class="sidebar-list">
                <a class="button-link" id="my-popover" title="Members"><i class="fas fa-user"></i>Members</a>
                <b-popover target="my-popover" custom-class="my-popover-class">
                  <template slot="title">Members</template>
                  <b-form-group id="user-list-input" label-for="input-users">
                      <multiselect
                        v-model="form.fullName"
                        :options="userList"
                        :multiple="true"
                        label="text"
                        track-by="value"
                        :close-on-select="true">
                      </multiselect>
                  </b-form-group>
                </b-popover>
                <a class="button-link" href="#" title="Labels"><i class="fas fa-tag"></i>Labels</a>
                <a class="button-link" href="#" title="Checklist"><i class="fas fa-check-square"></i>Checklist</a>
              </div>
              <div class="time-creation">
                <p>created at:</p>
                <p>updated at:</p>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Avatar from 'vue-avatar-component'
import UserService from '../../services/UserService'
const userService = new UserService()

export default {
  components: { Avatar, Multiselect },
  data () {
    return {
      selected: [],
      userList: [],
      fields: [],
      form: {
        fullName: []
      }
    }
  },
  computed: {
    userList () {
      return userService.getAll()
    }
  }
}
</script>
