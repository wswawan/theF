export const state = () => ({
  items: [
    {
      id: 1,
      name: 'Self'
    },
    {
      id: 2,
      name: 'Team'
    }
  ],
  employees: [
    {
      id: 1,
      name: 'wawan',
      role: 'IT Supervisor'
    },
    {
      id: 2,
      name: 'sumardi',
      role: 'Operational Manager'
    },
    {
      id: 3,
      name: 'ardi',
      role: 'Store Manager'
    },
    {
      id: 4,
      name: 'ws',
      role: 'Warehouse'
    }
  ],
  roles: [
    {
      id: 1,
      name: 'IT Supervisor',
      rules: [
        {
          name: 'shift',
          security: ['create', 'read', 'update', 'delete']
        },
        {
          name: 'employee',
          security: ['create', 'read', 'update', 'delete']
        }

      ]
    },
    {
      id: 2,
      name: 'Operational Manager'
    },
    {
      id: 3,
      name: 'Store Manager'
    },
    {
      id: 4,
      name: 'Warehouse'
    }

  ],
  securityRoles: [
    {
      name: 'shift',
      security: ['create', 'read', 'update', 'delete']
    },
    {
      name: 'employee',
      security: ['create', 'read', 'update', 'delete']
    }
  ],
  selectedEmployees: [],
  selectedRole: [],
  selfOrTeam: null,
  employeeName: null,
  employeeRole: null,
  employeeIndex: null,
  titleSheet: 'employee',
  salaryInputs: [],
  salaryName: null,
  salaryValue: null
})

export const getters = {
  getEmployees(state) {
    return state.employees
  },
  getRoles(state) {
    return state.roles
  },
  allEmployees(state) {
    return state.selectedEmployees.length === state.employees.length
  },
  someEmployees(state) {
    return (
      state.selectedEmployees.length > 0 &&
      !(state.selectedEmployees.length === state.employees.length)
    )
  }
}

export const mutations = {
  setTitleSheet(state, titleSheet) {
    state.titleSheet = titleSheet
  },
  setEmployeeName(state, employeeName) {
    state.employeeName = employeeName
  },
  setEmployeeRole(state, employeeRole) {
    state.employeeRole = employeeRole.name
  },
  setSelfOrTeam(state, selfOrTeam) {
    state.selfOrTeam = selfOrTeam
  },
  setSelectedEmployees(state, selectedEmployees) {
    state.selectedEmployees = selectedEmployees
    state.employeeName = selectedEmployees.name
    state.employeeRole = selectedEmployees.role
    state.employeeIndex = state.employees.indexOf(selectedEmployees)
  },
  setShiftSomeEmployee(state, shift) {
    Object.assign(state.selectedEmployees[state.employeeIndex], {
      shiftCode: shift
    })
  },
  setSaveEmployee(state) {
    const employee = {
      name: state.employeeName,
      role: state.employeeRole
    }
    if (state.employeeIndex > -1) {
      Object.assign(state.employees[state.employeeIndex], employee)
    } else {
      state.employees.unshift(employee)
    }
  },
  setDestroyEmployee(state) {
    state.employees.splice(state.employeeIndex, 1)
  },
  destroySelectedEmployee(state, selectedItem) {
    state.selectedEmployees = state.selectedEmployees.filter((item) => item !== selectedItem)
  },
  setResetEmployee(state) {
    state.selectedEmployees = []
    state.selectedRole = []
    state.employeeIndex = -1
    state.selfOrTeam = null
  },
  setSalaryName(state, salaryName) {
    state.salaryName = salaryName
  },
  setChangeSalary(state, index) {
    let salary
    if (state.salaryName || state.salaryValue) {
      salary = {
        salaryName: state.salaryName,
        salaryValue: state.salaryValue
      }
    }
    Object.assign(state.salaryInputs[index], salary)
  },
  setSalaryValue(state, salaryValue) {
    state.salaryValue = salaryValue
  },
  setAddInputs(state) {
    state.salaryInputs.push({})
  },
  destroySalaryInput(state, index) {
    state.salaryInputs.splice(state.salaryInputs[index], 1)
  },
  setSelectedRole(state, selectedRole) {
    state.selectedRole = selectedRole
  },
  setDestroyRole(state) {
    state.roles.splice(state.roles.indexOf(state.selectedRole), 1)
  }
}
