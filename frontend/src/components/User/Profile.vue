<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <h2 class="title">User Profile</h2>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Name</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input is-static" :value="user.name" readonly />
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Email Address</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input is-static" :value="user.email" readonly />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { USER_QUERY } from '@/graphql'

export default {
  name: 'Profile',
  components: {
  },
  data () {
    return {
      user: '',
      id: this.$route.params.id
    }
  },
  apollo: {
    // fetch user by ID
    user: {
      query: USER_QUERY,
      variables () {
        return {
          id: this.id
        }
      }
    }
  }
}
</script>
