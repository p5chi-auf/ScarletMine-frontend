<template>
  <b-container>
    <b-row align-h="center" class="mt-5">
      <b-col cols="12" md="8">
        <b-card >
          <div class="title-wrapper">
            <div class="window-title">
              <h5 class="card-title"><i class="far fa-credit-card"></i><b>Task-Title</b></h5>
            </div>
            <div class="project-title">
              <h5>(Project name)</h5>
            </div>
          </div>
          <div class="list-status">
            <p>in list:</p>
          </div>
          <div class="member-list">
            <h5><i class="fas fa-user-friends"></i><b>MEMBERS</b></h5>
              <div>
                <avatar fullname="Mihai Budeci" size="34"></avatar>
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

        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Avatar from 'vue-avatar-component'
export default {
  components: { Avatar }
}
</script>
