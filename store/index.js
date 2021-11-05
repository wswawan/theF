export const state = () => ({
  date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10),
  nowDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10),
})

export const mutations = {
  setDate(state, date) {
    state.date = date
  },
}
