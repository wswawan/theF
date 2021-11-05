<template>
  <v-container>
    <v-row justify='center'>
      <v-list class='text-center' color='transparent'>
        <v-avatar size='100'>
          <v-img
            src='https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003572/img/basic/a0003572_main.jpg?20200427164901&q=80&rw=750&rh=536'
          />
        </v-avatar>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Natasha Acory</v-list-item-title>
            <v-list-item-subtitle class='text-caption'
            >Art Director
            </v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-row>
    <v-row justify='center' align='center' dense>
      <v-col v-for='card in cards' :key='card.title' cols='3' sm='1'>
        <v-card class='text-center transparent' @click='showSheet(card)'>
          <img :src='card.img' />
          <v-card-subtitle class='pa-0'>{{ card.title }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-bottom-sheet v-model='bottomSheet'>
        <v-sheet class='text-center' height='200'>
          <v-layout fill-height>
            <v-row justify='center' align='center' dense no-gutters>
              <v-col v-for='(item, index) in sheetItem' :key='index' cols='3' sm='1'>
                <v-card class='text-center transparent' nuxt :to='item.link'>
                  <img :src='item.img' />
                  <v-card-subtitle class='pa-0'>{{ item.title }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-layout>
        </v-sheet>
      </v-bottom-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dateNow: new Date().toISOString().slice(0, 10),
    bottomSheet: false,
    sheetItem: [],
    cards: [
      {
        img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-sheet-business-and-teamwork-flatart-icons-lineal-color-flatarticons.png',
        title: 'Report',
        sheet: [
          {
            img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-calendar-business-and-teamwork-flatart-icons-lineal-color-flatarticons-1.png',
            title: 'Attendance',
            link: '/work-report'
          },
          {
            img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-clock-economy-flatart-icons-lineal-color-flatarticons.png',
            title: 'Over Time',
            link: '/work-report'
          },
          {
            img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-document-economy-flatart-icons-lineal-color-flatarticons.png',
            title: 'Salary Slip',
            link: '/salary'
          }

        ]
      },
      {
        img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-portfolio-business-and-teamwork-flatart-icons-lineal-color-flatarticons.png',
        title: 'Schedule',
        sheet: [
          {
            img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/60/000000/external-target-business-and-teamwork-flatart-icons-lineal-color-flatarticons.png',
            title: 'Work',
            link: '/work-schedule'
          },
          {
            img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/60/000000/external-travel-luggage-hotel-services-flatart-icons-lineal-color-flatarticons.png',
            title: 'Leave',
            link: '/leave-schedule'
          }
        ]
      },
      {
        img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-finance-book-economy-flatart-icons-lineal-color-flatarticons.png',
        title: 'Finance',
        sheet: [
          {
            img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-dollar-economy-flatart-icons-lineal-color-flatarticons-1.png',
            title: 'Loans',
            link: '/work-schedule'
          },
          {
            img: 'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-dollar-economy-flatart-icons-lineal-color-flatarticons-2.png',
            title: 'Reimburse',
            link: '/leave-schedule'
          }
        ]
      }
    ]
  }),
  methods: {
    showSheet(item) {
      this.bottomSheet = true
      this.sheetItem = Object.assign({}, item.sheet)
    }
  }
}
</script>

<style scoped>
.transparent {
  background: transparent;
  box-shadow: none !important;
}

.success-gradient {
  background: linear-gradient(
    234deg,
    rgba(3, 224, 227, 1) 0%,
    rgba(253, 187, 45, 0.4766281512605042) 100%
  );
}

.error-gradient {
  background: linear-gradient(
    280deg,
    rgba(227, 93, 3, 0.7287289915966386) 0%,
    rgba(253, 45, 87, 0.7315301120448179) 100%
  );
}

.purple-gradient {
  background: linear-gradient(
    236deg,
    rgba(157, 3, 227, 0.835171568627451) 0%,
    rgba(253, 45, 87, 0.7315301120448179) 100%
  );
}
</style>
