<template>
  <v-layout>
    <v-container>
      <v-row justify='center' dense>
        <v-col cols='12' sm='4' class='pa-0'>
          <v-subheader class='justify-center text-caption'
          >Attendance
          </v-subheader
          >
          <FilterAttendance :headers='headers' :items='getAttendances'>
            <template #card>
              <v-row dense justify='center' align='center' class='text-center ma-1'>
                <v-card-text class='pa-0'>
                  <v-card-subtitle class='pa-0 justify-center'>Summary</v-card-subtitle>
                </v-card-text>
                <v-col v-for='(work, key, index) in getStatus' :key='index' cols='4'>
                  <v-card>
                    <v-list-item-content>
                      <v-list-item-subtitle class='text-capitalize text-caption'>{{ key }}</v-list-item-subtitle>
                      <v-list-item-title class='text-h6'
                                         :class=' key==="off" ? "red--text" : key === "paid leave" ? "warning--text" : key ==="sick" ? "info--text" : "success--text"'>
                        {{ work }} <span class='text-caption text-capitalize'>Day{{ work > 1 ? 's' : '' }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-card>
                </v-col>
                <v-col v-if='getAttendances.length && (getLate.slice(1,2) > 0 || getLate.slice(-1) > 0)' cols='4'>
                  <v-card>
                    <v-list-item-content>
                      <v-list-item-subtitle class='text-capitalize text-caption'>Late (H.M)</v-list-item-subtitle>
                      <v-list-item-title class='text-h6 error--text'>
                        {{ getLate }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-card>
                </v-col>
                <v-col v-if='getAttendances.length && getOverTime.slice(-1) > 0' cols='4'>
                  <v-card>
                    <v-list-item-content>
                      <v-list-item-subtitle class='text-capitalize text-caption'>OT (H.M)</v-list-item-subtitle>
                      <v-list-item-title class='text-h6 success--text'>
                        {{ getOverTime }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </FilterAttendance>
          <v-data-table
            :headers='headers'
            :items='getAttendances'
            mobile-breakpoint='0'
            :items-per-page='itemsPerPage'
            :page.sync='page'
            hide-default-footer
            @page-count='pageCount = $event'
          >
            <template #item='{ item }'>
              <tr v-if="item.status === 'working'">
                <td>
                  <v-list-item>
                    <v-list-item-action-text
                    >
                      {{
                        new Intl.DateTimeFormat('ID', {
                          day: '2-digit',
                          month: 'short'
                        }).format(item.date)
                      }}
                    </v-list-item-action-text>
                  </v-list-item>
                </td>
                <td>
                  <v-list-item class='pa-0'>
                    <v-list-item-icon class='mr-0'>
                      <v-icon small color='success'
                      >mdi-arrow-top-right
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                          item.clockIn
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>
                  <v-list-item class='pa-0'>
                    <v-list-item-icon class='mr-0'>
                      <v-icon small color='error'
                      >mdi-arrow-bottom-right
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                          item.clockOut
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>
                  <v-list-item class='pa-0'>
                    <v-list-item-content>
                      <v-list-item-subtitle class='text-center'>
                        {{
                          getDuration[(getAttendances.indexOf(item))]
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>
                  <v-list-item class='pa-0'>
                    <v-list-item-content>
                      <v-list-item-subtitle class='text-center text-capitalize'>
                        {{ item.scheduleCode }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>
                  <v-list-item>
                    <v-list-item-icon class='mx-auto'>
                      <v-icon small class='mr-2'>mdi-pencil</v-icon>
                      <v-icon small>mdi-delete</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </td>
              </tr>
              <tr v-else class='primaryGradient'>
                <td>
                  <v-list-item>
                    <v-list-item-action-text
                    >{{
                        new Intl.DateTimeFormat('ID', {
                          day: '2-digit',
                          month: 'short'
                        }).format(item.date)
                      }}
                    </v-list-item-action-text>
                  </v-list-item>
                </td>
                <td colspan='5'>
                  <v-subheader class='text-capitalize justify-center'>
                    {{ item.status }}
                  </v-subheader>
                </td>
              </tr>
            </template>
          </v-data-table>
          <div class='text-center pt-2'>
            <v-pagination
              v-model='page'
              :length='pageCount'
              circle
            ></v-pagination>
          </div>
        </v-col>
        <v-bottom-sheet>
          <v-sheet>
            <v-layout>
              <v-row>
                <v-col></v-col>
              </v-row>
            </v-layout>
          </v-sheet>
        </v-bottom-sheet>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data: () => ({
    headers: [
      {
        text: 'Date',
        value: 'date',
        align: 'center'
      },
      {
        text: 'ClockIn',
        value: 'clockIn',
        sortable: false,
        align: 'center'
      },
      {
        text: 'ClockOut',
        value: 'clockOut',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Working',
        value: 'working',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Schedule',
        value: 'scheduleCode',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Actions',
        sortable: false,
        align: 'center'
      }
    ],
    page: 1,
    pageCount: 0,
    itemsPerPage: 10
  }),
  computed: {
    ...mapState('attendances', ['attendances', 'endDate']),
    ...mapGetters({
      getAttendances: 'attendances/getAttendances',
      getOverTime: 'attendances/getOverTime',
      getLate: 'attendances/getLate',
      getStatus: 'attendances/getStatus',
      getDuration: 'attendances/getDuration'
    })
  },
  beforeDestroy() {
    this.$store.commit('setResetDate')
  },


}
</script>

<style lang='scss'>
.primaryGradient {
  background: linear-gradient(
      228deg,
      rgba(3, 22, 227, 0.8911939775910365) 0%,
      rgba(253, 45, 87, 0.7315301120448179) 100%
  );

}
</style>
