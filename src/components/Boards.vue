<template>
  <div class="board">
    <div class="task-container">
      <ul class="task-list">
        <li class="task-column task-column-on-hold">
          <span class="task-column-header">
            <h2>Backlog</h2>
          </span>
          <div class="task-input">
            <input type="text" placeholder="Add another card" @keyup.enter="addIssue('tasks')" v-model="create.tasks">
          </div>
          <ul class="task-inner-list" id="tasks">
            <li v-for="item in tasks" class="task-item">
              <h1>{{item.name}}</h1>
              <ul class="assigned">
                <li v-for="dev in item.assigned">
                  <img :src="dev.avatar" alt="" />
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="task-column task-column-in-progress">
          <span class="task-column-header">
          <h2>In Progress</h2>
        </span>
          <div class="task-input">
            <input type="text" placeholder="Add another card" @keyup.enter="addIssue('inprogress')" v-model="create.inprogress">
          </div>
          <ul class="task-inner-list" id="inprogress">
            <li v-for="item in inprogress" class="task-item">
              <h1>{{item.name}}</h1>
              <ul class="assigned">
                <li v-for="dev in item.assigned">
                  <img :src="dev.avatar" alt="" />
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="task-column task-column-needs-review">
          <span class="task-column-header">
          <h2>Needs Review</h2>
        </span>
          <div class="task-input">
            <input type="text" placeholder="Add another card" @keyup.enter="addIssue('review')" v-model="create.review">
          </div>
          <ul class="task-inner-list" id="review">
            <li v-for="item in review" class="task-item">
              <h1>{{item.name}}</h1>
              <ul class="assigned">
                <li v-for="dev in item.assigned">
                  <img :src="dev.avatar" alt="" />
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="task-column task-column-approved">
          <span class="task-column-header">
            <h2>Approved</h2>
          </span>
          <div class="task-input">
            <input type="text" placeholder="Add another card" @keyup.enter="addIssue('approved')" v-model="create.approved">
          </div>
          <ul class="task-inner-list" id="approved">
            <li v-for="item in approved" class="task-item">
              <h1>{{item.name}}</h1>
              <ul class="assigned">
                <li v-for="dev in item.assigned">
                  <img :src="dev.avatar" alt="" />
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dragula from '../../node_modules/dragula/dragula'
export default {
  data () {
    return {
      created: onCreate,
      create: {},
      tasks: [{
        name: 'New sidebar design',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }, {
        name: 'Header design features',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }],
      inprogress: [{
        name: 'Login error',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }],
      review: [{
        name: 'Onboarding screens',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }, {
        name: 'Dashboard design',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }],
      approved: [{
        name: 'Account settings screen',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }, {
        name: 'Mobile layout',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }, {
        name: 'On scroll header layout',
        tracked: false,
        assigned: [{
          avatar: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
        }, {
          avatar: 'https://d.fastcompany.net/multisite_files/fastcompany/fc_files/profile/2219225-austin-carr-profile.jpg'
        }]
      }]
    }
  },
  methods: {
    addIssue: function (key) {
      if (!this.create[key]) return
      this[key].push({
        name: this.create[key],
        tracked: false
      })
      this.create[key] = ''
    }
  }
}

function onCreate () {
  $(document).ready(() => {
    dragula([
      document.getElementById('tasks'),
      document.getElementById('inprogress'),
      document.getElementById('review'),
      document.getElementById('approved')
    ])

      .on('drag', function (el) {
        el.classList.add('is-moving')
      })

      .on('dragend', function (el) {
        el.classList.remove('is-moving')
        window.setTimeout(function () {
          el.classList.add('is-moved')
          window.setTimeout(function () {
            el.classList.remove('is-moved')
          }, 600)
        }, 100)
      })
  })
}
</script>
