<template>
  <v-layout>
    <v-container class='py-0'>
      <v-row justify='center' dense>
        <DeleteConfirmation item='employee' @destroy='destroy' />
        <v-col cols='12' sm='4' class='pa-0'>
          <v-subheader class='justify-center text-capitalize pa-0'>Employee</v-subheader>
          <v-tabs v-model='tab' fixed-tabs>
            <v-tabs-slider color='error'></v-tabs-slider>
            <v-tab @click='setTitleSheet("employee")'>Employee</v-tab>
            <v-tab @click='setTitleSheet("role")'>Role</v-tab>
            <v-tab @click='setTitleSheet("salary")'>Salary</v-tab>
          </v-tabs>
          <v-tabs-items v-model='tab'>
            <v-tab-item>
              <EmployeeList :items='getEmployees' @editedItem='editedItem'
                            @dialogDelete='openDialogDeleteItem' />
              <!--              <v-list v-if='getEmployees.length' dense>-->
              <!--                <v-list-item v-for='(employee, index) in getEmployees' :key='index'>-->
              <!--                  <v-list-item-content>-->
              <!--                    <v-list-item-title class='text-capitalize'>{{ employee.name }}</v-list-item-title>-->
              <!--                    <v-list-item-subtitle class='text-caption'>{{ employee.role }}</v-list-item-subtitle>-->
              <!--                  </v-list-item-content>-->
              <!--                  <v-list-item-icon class='mx-auto'>-->
              <!--                    <v-icon class='mr-2' @click='editedEmployee(employee)'>mdi-pencil</v-icon>-->
              <!--                    <v-icon @click='openDialogDeleteEmployee(employee)'>mdi-delete</v-icon>-->
              <!--                  </v-list-item-icon>-->
              <!--                </v-list-item>-->
              <!--              </v-list>-->
              <!--              <v-list v-else>-->
              <!--                <v-list-item>-->
              <!--                  <v-list-item-content>-->
              <!--                    <v-list-item-subtitle class='text-center'>No data available</v-list-item-subtitle>-->
              <!--                  </v-list-item-content>-->
              <!--                </v-list-item>-->
              <!--              </v-list>-->
            </v-tab-item>
            <v-tab-item>
              <EmployeeList :items='getRoles' @editedItem='editedItem' @dialogDelete='openDialogDeleteItem' />
              <!--              <v-list dense>-->
              <!--                <v-list-item v-for='(role, index) in getRoles' :key='index'>-->
              <!--                  <v-list-item-content>-->
              <!--                    <v-list-item-title class='text-capitalize'>{{ role.name }}</v-list-item-title>-->
              <!--                  </v-list-item-content>-->
              <!--                  <v-list-item-icon class='mx-auto'>-->
              <!--                    <v-icon class='mr-2'>mdi-pencil</v-icon>-->
              <!--                    <v-icon>mdi-delete</v-icon>-->
              <!--                  </v-list-item-icon>-->
              <!--                </v-list-item>-->
              <!--              </v-list>-->
            </v-tab-item>
          </v-tabs-items>
        </v-col>
        <v-fab-transition>
          <v-btn fab fixed bottom right class='mb-15' @click='showSheetEmployee'>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-row>
      <v-bottom-sheet v-model='bottomSheet' scrollable>
        <v-card class='pa-0'>
          <v-card-text class='pa-0'>
            <v-col v-if='titleSheet === "employee"' class='pa-0'>
              <v-subheader class='justify-center text-capitalize pa-0'>{{ titleSheet }}</v-subheader>
              <v-form>
                <v-card-text class='py-0'>
                  <v-text-field label='Employee name' :value='selectedEmployees.name'
                                @change='setEmployeeName'></v-text-field>
                  <v-select :value='selectedEmployees' label='Role' :items='roles' item-value='id' item-text='name'
                            hide-selected return-object @change='setEmployeeRole'></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color='primary' @click='saveEmployee'>submit</v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
            <v-col v-else-if='titleSheet === "role"' class='pa-0'>
              <v-subheader class='justify-center text-capitalize pa-0'>{{ titleSheet }}</v-subheader>
              <v-form>
                <v-card-text class='py-0'>
                  <v-text-field :value='selectedRole.name' label='Role name' dense></v-text-field>
                  <v-list v-for='(role, index) in selectedRole.rules' :key='index' dense>
                    <v-combobox :items='role.security' multiple :label='role.name' class='text-capitalize'
                                chips></v-combobox>
                    <!--                    <v-list-group :value='false'>-->
                    <!--                      <template #activator>-->
                    <!--                        <v-list-item-title class='text-capitalize'>{{ role.name }}</v-list-item-title>-->
                    <!--                      </template>-->
                    <!--                      <v-list-item-content>-->
                    <!--                        <v-checkbox v-for='(item, indexSecurity) in role.security' :key='indexSecurity'-->
                    <!--                                    :label='item' hide-details class='text-capitalize pr-1'></v-checkbox>-->
                    <!--                      </v-list-item-content>-->
                    <!--                    </v-list-group>-->
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn block>submit</v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
            <v-col v-else>
              <v-form>
                <v-select v-model='salaryType' :items='["increase","decrease"]' label='type'></v-select>
                <v-scroll-y-transition group>
                  <v-row v-for='(input, index) in salaryInputs' :key='index' dense>
                    <v-col class='py-0'>
                      <v-text-field label='Name' @input='setSalaryName'
                                    @change='setChangeSalary(index)'></v-text-field>
                    </v-col>
                    <v-col class='py-0'>
                      <v-text-field label='Value' @input='setSalaryValue'
                                    @change='setChangeSalary(index)'></v-text-field>
                    </v-col>
                    <v-col class='py-0'>
                      <v-select label='Unit' :items='["hour","day","month"]'>
                        <template #append-outer>
                          <v-btn fab x-small icon>
                            <v-icon color='error' @click='destroySalaryInput(index)'>mdi-close</v-icon>
                          </v-btn>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-scroll-y-transition>
                <v-card-actions class='pa-0'>
                  <v-spacer></v-spacer>
                  <v-btn x-small color='info' fab @click='setAddInputs'>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'EmployeePage',
  data: () => ({
    tab: null,
    tabRole: null,
    bottomSheet: false,
    salaryType: 'increase'
  }),
  computed: {
    ...mapGetters({
      getEmployees: 'employees/getEmployees',
      getRoles: 'employees/getRoles'
    }),
    ...mapState(['dialogDelete']),
    ...mapState('employees', ['titleSheet', 'selectedEmployees', 'selectedRole', 'roles', 'employeeName', 'employeeRole', 'salaryName', 'salaryValue', 'salaryInputs', 'securityRoles'])
  },
  watch: {
    bottomSheet() {
      if (!this.bottomSheet) {
        this.setResetEmployee()
      }
    }
  },
  methods: {
    ...mapMutations({
      setDialogDelete: 'setDialogDelete',
      setEmployeeName: 'employees/setEmployeeName',
      setEmployeeRole: 'employees/setEmployeeRole',
      setTitleSheet: 'employees/setTitleSheet',
      setSelectedEmployee: 'employees/setSelectedEmployees',
      setSelectedRole: 'employees/setSelectedRole',
      setResetEmployee: 'employees/setResetEmployee',
      setSaveEmployee: 'employees/setSaveEmployee',
      setDestroyEmployee: 'employees/setDestroyEmployee',
      setDestroyRole: 'employees/setDestroyRole',
      setSalaryName: 'employees/setSalaryName',
      setChangeSalary: 'employees/setChangeSalary',
      setSalaryValue: 'employees/setSalaryValue',
      setAddInputs: 'employees/setAddInputs',
      destroySalaryInput: 'employees/destroySalaryInput'
    }),
    editedItem(item) {
      if (this.titleSheet === 'employee') {
        this.setSelectedEmployee(item)
      } else {
        this.setSelectedRole(item)
      }
      this.showSheetEmployee()
    },
    saveEmployee() {
      this.setSaveEmployee()
      this.showSheetEmployee()
    },
    openDialogDeleteItem(item) {
      this.setDialogDelete()
      if (this.titleSheet === 'employee')
        this.setSelectedEmployee(item)
      else
        this.setSelectedRole(item)
    },
    destroy() {
      if (this.titleSheet === 'employee')
        this.setDestroyEmployee()
      else
        this.setDestroyRole()

      this.setDialogDelete(this.dialogDelete)
    },
    showSheetEmployee() {
      this.bottomSheet = !this.bottomSheet
    }

  }
}
</script>

<style>
.v-text-field input {
  text-transform: capitalize;
}

.v-list-group__header.v-list-item.v-list-item--link.theme--dark {
  padding: 0;
}
</style>
