<template>
  <div>
<!--    <v-menu-->
<!--      v-model='menu'-->
<!--      :close-on-content-click='false'-->
<!--      :nudge-right='40'-->
<!--      transition='scale-transition'-->
<!--      offset-y-->
<!--      min-width='auto'-->
<!--    >-->
<!--      <template #activator='{ on, attrs }'>-->
<!--        <v-text-field-->
<!--          :value='startDate'-->
<!--          label='Start Date'-->
<!--          v-bind='attrs'-->
<!--          readonly-->
<!--          v-on='on'-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <v-icon color='success'>mdi-calendar-outline</v-icon>-->
<!--          </template>-->
<!--        </v-text-field>-->
<!--      </template>-->
<!--      <v-date-picker-->
<!--        :value='getStartDate'-->
<!--        color='success'-->
<!--        :min='nowDate'-->
<!--        :max='getEndDate'-->
<!--        @change='setStartDate'-->
<!--        @input='menu = false'-->
<!--      >-->
<!--      </v-date-picker>-->
<!--    </v-menu>-->
<!--    <v-menu-->
<!--      v-model='menuEnd'-->
<!--      :close-on-content-click='false'-->
<!--      :nudge-right='40'-->
<!--      transition='scale-transition'-->
<!--      offset-y-->
<!--      min-width='auto'-->
<!--    >-->
<!--      <template #activator='{ on, attrs }'>-->
<!--        <v-text-field-->
<!--          label='End Date'-->
<!--          v-bind='attrs'-->
<!--          :value='startDate > endDate ? endDate : nowDate'-->
<!--          readonly-->
<!--          v-on='on'-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <v-icon color='error'>mdi-calendar-clock-outline</v-icon>-->
<!--          </template>-->
<!--        </v-text-field>-->
<!--      </template>-->
<!--      <v-date-picker-->
<!--        :value='nowDate'-->
<!--        color='error'-->
<!--        :min='startDate'-->
<!--        :max='getEndDate'-->
<!--        @change='setEndDate'-->
<!--        @input='menuEnd = false'-->
<!--      >-->
<!--      </v-date-picker>-->
<!--    </v-menu>-->
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
    <slot name='card'></slot>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'FilterAttendance',
  data: () => ({

    menu: false,
    menuEnd: false,

  }),
  computed: {
    ...mapState(['nowDate', 'startDate', 'endDate', 'date', 'minDate', 'maxDate', 'date']),
    ...mapState('attendances', ['attendances']),
    ...mapGetters({
      getEndDate: 'getEndDate',
      getStartDate: 'getStartDate'
    })
  },
  methods: {
    ...mapMutations({
      setRangeDate: 'setRangeDate',
      setStartDate: 'setStartDate',
      setEndDate: 'setEndDate',
    }),
  }
}
</script>



