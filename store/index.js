export const state = () => ({
  date: (new Date(Date.now() - new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
  startDate: new Date(new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setMonth(new Date().getMonth() - 1)).setDate(26))
    .toISOString()
    .slice(0, 10),
  nowDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10),
  endDate: new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setDate(25)).toISOString().slice(0, 10),
  dialogDelete: null,
  minDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1).toISOString(),
  maxDate: new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setMonth(new Date().getMonth() + 1)).toISOString()
})

export const getters = {
  getDate(state) {
    return state.date
  },
  getStartDate(state) {
    const month = state.startDate.slice(5, 7)
    if (state.date > state.endDate) {
      return new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setMonth(month)).toISOString().slice(0, 10)
    } else {
      return state.startDate
    }
  },
  getEndDate(state) {
    const month = state.endDate.slice(5, 7)
    if (state.date > state.endDate) {
      return new Date(new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setMonth(month)).setDate(26)).toISOString().slice(0, 10)
    } else {
      return state.endDate
    }
  },
  getMaxDate(state) {
    return new Date(new Date(state.maxDate - new Date().getTimezoneOffset() * 60000))
  }
}

export const mutations = {
  setDateItem(state, date) {
    state.date = date
  },
  setStartDate(state, startDate) {
    state.startDate = startDate
  },
  setEndDate(state, endDate) {
    state.endDate = endDate
  },
  setDialogDelete(state, dialogDelete) {
    state.dialogDelete = !dialogDelete
  },
  setRangeDate(state, date) {
    state.date = date
    state.startDate = new Date(new Date(new Date(date).setMonth(new Date(date).getMonth() - 1)).setDate(26)).toISOString().slice(0, 10)
    state.endDate = new Date(new Date(date).setDate(25)).toISOString().slice(0, 10)
  },
  setResetDate(state) {
    state.date = (new Date(Date.now() - new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
    state.startDate = new Date(new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setMonth(new Date().getMonth() - 1)).setDate(26))
      .toISOString()
      .slice(0, 10)
    state.endDate = new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setDate(25)).toISOString().slice(0, 10)
    state.minDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1).toISOString()
    state.maxDate = new Date(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).setMonth(new Date().getMonth() + 1)).toISOString()
  }
}
