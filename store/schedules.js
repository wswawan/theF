export const state = () => ({
  schedules: [
    {
      id: 1,
      name: 'Morning',
      group: 'work',
    },
    {
      id: 2,
      name: 'Middle',
      group: 'work',
    },
    {
      id: 3,
      name: 'Afternoon',
      group: 'work',
    },
    {
      id: 4,
      name: 'Off',
      group: 'leave',
    },
    {
      id: 5,
      name: 'Paid Leave',
      group: 'leave',
    },
    {
      id: 6,
      name: 'Sick',
      group: 'leave',
    },
    {
      id: 7,
      name: 'Other Permission',
      group: 'leave',
    },
  ],
  items: [
    {
      id: 1,
      name: 'Self',
    },
    {
      id: 2,
      name: 'Team',
    },
  ],
  employees: [
    {
      id: 1,
      name: 'wawan',
    },
    {
      id: 2,
      name: 'sumardi',
    },
    {
      id: 3,
      name: 'ardi',
    },
    {
      id: 4,
      name: 'ws',
    },
  ],
  selectedSchedule: null,
  selectedEmployees: [],
  selfOrTeam: null,
})

export const getters = {
  getEndDate() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 26)
      .toISOString()
      .slice(0, 10)
  },
  allEmployees(state) {
    return state.selectedEmployees.length === state.employees.length
  },
  someEmployees(state) {
    return (
      state.selectedEmployees.length > 0 &&
      !(state.selectedEmployees.length === state.employees.length)
    )
  },
}

export const mutations = {
  setSelfOrTeam(state, selfOrTeam) {
    state.selfOrTeam = selfOrTeam
  },
  setSelectedSchedule(state, selectedShedule) {
    state.selectedSchedule = selectedShedule
  },
  setSelectedEmployees(state, selectedEmployees) {
    state.selectedEmployees = selectedEmployees
  },
  setReset(state) {
    state.selectedSchedule = null
    state.selectedEmployees = []
    state.selfOrTeam = null
  },
}
