<template>
  <v-layout>
    <v-container>
      <v-row justify='center' dense>
        <v-col cols='12' sm='4' class='pa-0'>
          <v-subheader class='justify-center text-caption'>Salary</v-subheader>
          <v-menu
            v-model='menu'
            :close-on-content-click='false'
            :nudge-right='40'
            transition='scale-transition'
            offset-y
            min-width='auto'
          >
            <template #activator='{ on, attrs }'>
              <v-text-field
                :value='date.slice(0,7)'
                label='Period'
                v-bind='attrs'
                readonly
                v-on='on'
              >
                <template #prepend>
                  <v-icon color='success'>mdi-calendar-outline</v-icon>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              :value='date'
              :min='minDate'
              :max='maxDate'
              type='month'
              color='success'
              @change='setRangeDate'
              @input='menu = false'
            >
            </v-date-picker>
          </v-menu>
          <v-list v-if='getAttendances.length'>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Present <v-chip small>{{status.working}}</v-chip></v-list-item-subtitle>
                <v-list-item-title>{{ new Intl.NumberFormat('ID', {style:'currency', currency: 'IDR', minimumFractionDigits: 0}).format(status.working * 90000)}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Over Time <v-chip small>{{getOverTime}}</v-chip></v-list-item-subtitle>
                <v-list-item-title>{{new Intl.NumberFormat('ID', {style:'currency', currency: 'IDR', minimumFractionDigits: 0}).format(overTime)}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Late <v-chip small >{{getLate}}</v-chip></v-list-item-subtitle>
                <v-list-item-title>{{new Intl.NumberFormat('ID', {style:'currency', currency: 'IDR', minimumFractionDigits: 0}).format(late)}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-chip-group>
                  <v-chip small color='error'>Off : {{status.off}}</v-chip>
                  <v-chip small color='info'>Sick : {{status.sick}}</v-chip>
                  <v-chip small color='warning'>Paid Leave : {{status['paid leave']}}</v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Amount</v-list-item-subtitle>
                <v-list-item-title>{{new Intl.NumberFormat('ID', {style:'currency', currency: 'IDR', minimumFractionDigits: 0}).format((status.working * 90000) + overTime - late)}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item-content>
              <v-list-item-subtitle class='text-center'>No data available</v-list-item-subtitle>
            </v-list-item-content>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'SalaryPage',
  data: () => ({
    menu: false,
    // minDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1).toISOString(),
    // maxDate: new Date(Date.now() - new Date().getTimezoneOffset()*60000).toISOString()
  }),
  computed: {
    ...mapState(['date', 'minDate', 'maxDate']),
    ...mapGetters({
      getAttendances: 'attendances/getAttendances',
      status: 'attendances/getStatus',
      getOverTime: 'attendances/getOverTime',
      getLate: 'attendances/getLate',
    }),
    overTime(){
      const hour = this.getOverTime.slice(0,1) > 0 ? this.getOverTime.slice(0,2) : this.getOverTime.slice(1,2)
      const minute = this.getOverTime.slice(3,4) > 0 ? this.getOverTime.slice(-2) : this.getOverTime.slice(2,3)
      return hour * 15000 + minute * 250
    },
    late(){
      const hour = this.getLate.slice(0,1) > 0 ? this.getLate.slice(0,2) : this.getLate.slice(1,2)
      const minute = this.getLate.slice(-2) > 30 ? 1 : 0
      return (Number(hour) + Number(minute)) * 10000
    }
  },
  beforeDestroy() {
    this.$store.commit('setResetDate')
  },
  methods: {
    ...mapMutations({
      setDate: 'setDateItem',
      setRangeDate: 'setRangeDate'
    })
  }
}
</script>

<style></style>
