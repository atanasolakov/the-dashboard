<template>
  <div class="d-flex flex-row">
    <v-card outlined shaped class="flex-grow-1 mr-2">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">Users</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="app in apps" :key="app.name" @click="selectApp(app.key)">
            <td>{{ app.title }}</td>
            <td>{{ app.userCount }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card outlined shaped class="flex-grow-1 mr-2">
      <div class="pa-2">App details</div>
      <div>{{ detailedApp?.title }}</div>
      <div>{{ detailedApp?.description }}</div>
      <div :style="{ color: calculateColorUsers() }">Users : {{ detailedApp?.totalUsers }} out of {{ detailedApp?.userLimit }}</div>
      <div :style="{ color: calculateColorUsage() }">Usage : {{ detailedApp?.usage }} out of {{ detailedApp?.usageLimit }}</div>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    this.loadApps()
  },

  computed: {
    ...mapState('Apps', ['apps']),
    ...mapState('App', ['detailedApp'])
  },

  methods: {
    ...mapActions('App', ['loadApp']),
    ...mapActions('Apps', ['loadApps']),

    calculateColorUsage () {
      if (this.detailedApp) {
        const percentage = (this.detailedApp.usage / this.detailedApp.usageLimit) * 100
        if (percentage >= 70 && percentage <= 90) {
          return 'yellow'
        } else if (percentage > 90) {
          return 'red'
        } else { return 'green' }
      }
    },

    calculateColorUsers () {
      if (this.detailedApp) {
        const percentage = (this.detailedApp.totalUsers / this.detailedApp.userLimit) * 100
        if (percentage >= 70 && percentage <= 90) {
          return 'yellow'
        } else if (percentage > 90) {
          return 'red'
        } else { return 'green' }
      }
    },

    async selectApp (appKey) {
      try {
        await this.loadApp(appKey)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('App not found')
        } else {
          console.error('Error fetching app:', error.message)
        }
      }
    }
  }
}
</script>
