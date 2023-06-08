import axios from 'axios'

export const state = () => ({
  detailedApp: null
})

export const actions = {
  async loadApp (context, appKey) {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/apps/${appKey}`)
      context.commit('setApp', data)
    } catch (error) {
      console.error('Failed to load app details.')
      console.error(error)
    }
  }
}

export const mutations = {
  setApp (state, detailedApp) {
    state.detailedApp = detailedApp
  }
}
