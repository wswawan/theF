<template>
  <v-row justify="center" class="text-center">
    <v-col cols="12" sm="4">
      <v-list-item-title class="text-center"
        ><v-icon>mdi-account-hard-hat</v-icon> Work Schedule</v-list-item-title
      >
      <v-list-item-content>
        <v-select
          :items="items"
          item-text="name"
          item-value="id"
          label="Self or Team"
          @change="setSelfOrTeam"
        >
          <template #prepend-inner>
            <v-icon color="primary">mdi-microsoft-teams</v-icon>
          </template>
        </v-select>
        <v-select
          v-if="selfOrTeam === 1"
          :value="selectedSchedule"
          :items="workSchedule"
          item-value="id"
          item-text="name"
          label="Shift"
          @change="setSelectedSchedule"
        >
          <template #prepend-inner>
            <v-icon color="warning">mdi-clipboard-text-clock-outline</v-icon>
          </template>
        </v-select>
        <v-select
          v-if="selfOrTeam === 2"
          :value="selectedEmployees"
          :items="employees"
          item-value="id"
          item-text="name"
          label="Select Staff"
          multiple
          return-object
          @change="setSelectedEmployees"
        >
          <template #prepend-inner>
            <v-icon color="warning">mdi-account-group-outline</v-icon>
          </template>
          <template #prepend-item>
            <v-list-item ripple @click="toggle">
              <v-list-item-action>
                <v-icon
                  :color="selectedEmployees.length > 0 ? 'indigo darken-3' : ''"
                  >{{ icon }}</v-icon
                >
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Select All</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              label="Select Date"
              :value="date"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            :value="date"
            :min="nowDate"
            :max="getEndDate"
            color="error"
            header-color="grey"
            @input="menu = false"
            @change="setDate"
          ></v-date-picker>
        </v-menu>
      </v-list-item-content>
      <v-list v-if="selectedEmployees.length" style="background: transparent">
        <v-list-item
          v-for="(employee, index) in selectedEmployees"
          :key="employee.id"
          class="pa-0"
        >
          <v-list-item-content class="pa-0">
            <v-text-field
              :value="employee.name"
              readonly
              label="Name"
              class="employee"
            >
              <template #prepend>
                <v-icon :color="index % 2 === 0 ? 'info' : 'error'"
                  >mdi-clipboard-account-outline</v-icon
                >
              </template>
            </v-text-field>
          </v-list-item-content>
          <v-list-item-content class="pa-0">
            <v-select
              prepend-icon="mdi-calendar-clock"
              label="Shift"
              :items="workSchedule"
              item-value="id"
              item-text="name"
            ></v-select>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn rounded color="primary" min-width="200">submit</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    menu: false,
    modal: false,
  }),
  computed: {
    workSchedule() {
      return this.schedules.filter((item) => item.group === 'work')
    },
    icon() {
      if (this.allEmployees) return 'mdi-close-box'
      if (this.someEmployees) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    ...mapState(['date', 'nowDate']),
    ...mapState('schedules', [
      'schedules',
      'items',
      'employees',
      'selectedSchedule',
      'selectedEmployees',
      'selfOrTeam',
    ]),
    ...mapGetters({
      getEndDate: 'schedules/getEndDate',
      allEmployees: 'schedules/allEmployees',
      someEmployees: 'schedules/someEmployees',
    }),
  },
  beforeDestroy() {
    this.$store.commit('schedules/setReset')
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.allEmployees) {
          this.$store.commit('schedules/setSelectedEmployees', [])
        } else {
          this.$store.commit(
            'schedules/setSelectedEmployees',
            this.employees.slice()
          )
        }
      })
    },
    ...mapMutations(['setDate']),
    ...mapMutations('schedules', [
      'setSelfOrTeam',
      'setSelectedSchedule',
      'setSelectedEmployees',
    ]),
  },
}
</script>

<style scoped>
* >>> .employee input {
  text-transform: capitalize;
}
* >>> .v-select__selections {
  text-transform: capitalize;
}
</style>
