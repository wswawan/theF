<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align='center'>
        <v-col class='pa-0' cols='12' sm='4'>
          <v-list dense color='transparent'>
            <v-subheader class='justify-center'>Settings</v-subheader>
            <v-list-item-group>
              <div v-for='(item,index) in items' :key='index'>
                <v-list-item nuxt :to='item.link'>
                  <v-list-item-icon>
                    <v-img max-width='25' max-height='25' :src="`https://img.icons8.com/ios/50/ffffff/${item.img}`"/>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'SettingPage',
  data: () => ({
    items: [
      {
        img:"guest-male.png",
        title: 'Profile'
      },
      {
        img:"overtime.png",
        title: 'Shift',
        link: '/shift'
      },
      {
        img:"place-marker--v2.png",
        title: 'Store List'
      },
      {
        img: "conference-call.png",
        title: 'Employees',
        link: '/employee'
      },
      {
        img:"power-off-button--v1.png",
        title: 'Log Out'
      }
    ]
  })
}
</script>

<style scoped>

</style>
