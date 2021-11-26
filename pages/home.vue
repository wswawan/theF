<template>
  <v-layout fill-height align-center>
    <v-container>
      <v-row justify="center" align='center'>
        <v-list class="text-center" color="transparent">
          <v-avatar size="100">
            <v-img
              src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg?20200427164901&q=80&rw=750&rh=536"
            />
          </v-avatar>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Natasha Acory</v-list-item-title>
              <v-list-item-subtitle class="text-caption"
              >Art Director
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
      <v-row justify="center" align="center" dense>
        <v-col v-for="card in cards" :key="card.title" cols="3" sm="1">
          <v-card class="text-center transparent elevation-0" @click="showSheet(card)">
            <img height='60' :src="card.img" :alt='card.title'/>
            <v-card-subtitle class="pa-0">{{ card.title }}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-bottom-sheet v-model="bottomSheet">
          <v-sheet class="text-center">
            <v-layout fill-height>
              <v-row justify="center" align="center" dense no-gutters>
                <v-col
                  v-for="(item, index) in sheetItem"
                  :key="index"
                  cols="3"
                  sm="1"
                >
                  <v-card class="text-center transparent elevation-0 pa-2" nuxt :to="item.link">
                    <img height='60' :src="item.img" :alt='item.title' />
                    <v-card-subtitle class="pa-0">{{
                        item.title
                      }}</v-card-subtitle>
                  </v-card>
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
export default {
  data: () => ({
    dateNow: new Date().toISOString().slice(0, 10),
    bottomSheet: false,
    sheetItem: [],
    cards: [
      {
        img: 'business_report.svg',
        title: 'Report',
        sheet: [
          {
            img: 'chess_clock.svg',
            title: 'Attendance',
            link: '/work-report',
          },
          {
            img: 'check.svg',
            title: 'Salary Slip',
            link: '/salary',
          },
        ],
      },
      {
        img: 'schedule.svg',
        title: 'Schedule',
        sheet: [
          {
            img:'business.svg',
            title: 'Work',
            link: '/work-schedule',
          },
          {
            img: 'airplane_take_off.svg',
            title: 'Leave',
            link: '/leave-schedule',
          },
        ],
      },
      {
        img: 'man_in_blue_shirt_cash_money.svg',
        title: 'Finance',
        sheet: [
          {
            img: 'cash_in_hand.svg',
            title: 'Loans',
            link: '/work-schedule',
          },
          {
            img: 'refund.svg',
            title: 'Reimburse',
            link: '/leave-schedule',
          },
        ],
      },
    ],
  }),
  methods: {
    showSheet(item) {
      this.bottomSheet = true
      this.sheetItem = Object.assign({}, item.sheet)
    },
  },
}
</script>

<style scoped>

</style>
