<template>
  <v-layout>
    <v-container>
      <v-row justify='center' dense>
        <DeleteConfirmation item='shift' @destroy='destroy'/>
        <v-col cols='12' sm='4' class='pa-0'>
          <v-subheader class='justify-center pa-0'>Shifts</v-subheader>
          <v-tabs v-model='tab' fixed-tabs>
            <v-tabs-slider color='error'></v-tabs-slider>
            <v-tab @click='setType("work")'>
              work
            </v-tab>
            <v-tab @click='setType("leave")'>
              leave
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model='tab'>
            <v-tab-item>
              <ShiftList :shifts='getWork' @create='showSheet' @edit='editedItem' @destroy='openDialogDelete' />
            </v-tab-item>
            <v-tab-item>
              <ShiftList :shifts='getLeave' @create='showSheet' @edit='editedItem' @destroy='openDialogDelete' />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
        <v-bottom-sheet v-model='bottomSheet'>
          <v-sheet>
            <v-layout>
              <v-row dense no-gutters>
                <v-col class='pa-0'>
                  <v-subheader class='justify-center text-capitalize pa-0'>{{ shiftType }}</v-subheader>
                  <v-form>
                    <v-card-text class='py-0'>
                      <v-text-field label='Shift name' :value='shiftName' @input='setShiftName'></v-text-field>
                      <v-row>
                        <v-col>
                          <v-menu
                            ref='menu'
                            v-model='menu1'
                            :close-on-content-click='false'
                            :return-value.sync='time1'
                            transition='scale-transition'
                            offset-y
                          >
                            <template #activator='{on, attrs}'>
                              <v-text-field
                                label='Time start'
                                :value='timeStart'
                                readonly
                                v-bind='attrs'
                                v-on='on'
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if='menu1 && shiftType==="work"'
                              v-model='time1'
                              color='grey darken-1'
                              format='24hr'
                              @click:minute=$refs.menu.save(time1)
                              @change='setTimeStart'
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col>
                          <v-menu
                            ref='menuEnd'
                            v-model='menu2'
                            :close-on-content-click='false'
                            :return-value.sync='time2'
                            transition='scale-transition'
                            offset-y
                          >
                            <template #activator='{on, attrs}'>
                              <v-text-field
                                label='Time start'
                                :value='timeEnd'
                                readonly
                                v-bind='attrs'
                                v-on='on'
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if='menu2 && shiftType === "work"'
                              v-model='time2'
                              :min='getMinTime'
                              color='grey darken-1'
                              format='24hr'
                              @click:minute=$refs.menuEnd.save(time2)
                              @change='setTimeEnd'
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn block color='primary' @click='submit'>submit</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-col>
              </v-row>
            </v-layout>
          </v-sheet>
        </v-bottom-sheet>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
// import dayjs from 'dayjs'
// const utc = require('dayjs/plugin/utc')
// const timezone = require('dayjs/plugin/timezone')
// dayjs.extend(utc)
// dayjs.extend(timezone)

export default {
  name: 'ShiftPage',
  data: () => ({
    tab: null,
    bottomSheet: false,
    time1: null,
    time2: null,
    menu1: false,
    menu2: false,
  }),
  computed: {
    getMinTime() {
      const hours = this.timeStart.slice(0, 2)
      const minutes = Number(this.timeStart.slice(-2) > 9 ? this.timeStart.slice(-2) : this.timeStart.slice(-1)) + 1
      return hours + ':' + `${minutes > 9 ? minutes : '0' + minutes}`

    },
    ...mapState(['dialogDelete']),
    ...mapState('shifts', ['id', 'shiftName', 'timeStart', 'timeEnd', 'shiftType']),
    ...mapGetters({
      getWork: 'shifts/getWork',
      getLeave: 'shifts/getLeave'
    })
  },
  watch: {
    bottomSheet() {
      if (!this.bottomSheet) {
        this.setResetShift()
      }
    },

  },
  methods: {
    ...mapMutations({
      setDialogDelete: 'setDialogDelete',
      setShiftName: 'shifts/setShiftName',
      setTimeStart: 'shifts/setTimeStart',
      setTimeEnd: 'shifts/setTimeEnd',
      setEditedItem: 'shifts/setEditedItem',
      setResetShift: 'shifts/setResetShift',
      setSaveShift: 'shifts/setSaveShift',
      setEditedIndex: 'shifts/setEditedIndex',
      setType: 'shifts/setType',
      setDestroyShift: 'shifts/setDestroyShift'
    }),
    showSheet() {
      this.bottomSheet = true
    },
    editedItem(shift) {
      this.setEditedItem(shift)
      this.showSheet()
    },
    openDialogDelete(shift) {
      this.setDialogDelete()
      this.setEditedItem(shift)
    },
    destroy() {
      this.setDestroyShift()
      this.setDialogDelete(this.dialogDelete)
    },
    submit() {
      this.$store.commit('shifts/setSaveShift')
      this.time1 = null
      this.time2 = null
      this.bottomSheet = false
    }
  }
}

</script>

<style scoped>

</style>
