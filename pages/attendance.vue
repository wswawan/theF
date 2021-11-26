<template>
  <v-layout fill-height align-center>
    <v-container>
      <v-row justify="center" align="center">
        <v-list-item class="text-center">
          <v-list-item-content>
            <v-list-item-title class="text-h3">{{ time }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ new Date().toDateString() }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-row>
      <v-row justify="center" class="text-center">
        <v-btn class="rounded-circle clockOut" width="150" height="150">
          <v-list-item-content>
            <v-icon size="60">mdi-gesture-tap</v-icon>
            <v-list-item-subtitle class="pa-2 text-caption text-capitalize"
              >clock in
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-btn>
        <v-list-item>
          <v-list-item-subtitle class="text-caption">
            <v-icon>mdi-map-marker-outline</v-icon>
            Location : Outlet ABC
          </v-list-item-subtitle>
        </v-list-item>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="4">
          <v-list-item>
            <v-list-item-content class="justify-center">
              <v-img
                max-width="50"
                max-height="50"
                src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                class="rounded-circle"
              ></v-img>
            </v-list-item-content>
            <v-list-item-content class="text-center text-capitalize">
              <v-list-item-subtitle class="text-caption success--text"
                >clock in
              </v-list-item-subtitle>
              <v-icon color="success">mdi-clock-check-outline</v-icon>
              <v-list-item-subtitle class="text-caption success--text"
                >--:--
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content class="text-center text-capitalize">
              <v-list-item-subtitle class="text-caption error--text"
                >clock out
              </v-list-item-subtitle>
              <v-icon color="error">mdi-clock-remove-outline</v-icon>
              <v-list-item-subtitle class="text-caption error--text"
                >--:--
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content class="justify-center">
              <v-img
                max-width="50"
                max-height="50"
                src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                class="rounded-circle"
              ></v-img>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    interval: null,
    time: null,
  }),
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat('id-id', {
        hour: 'numeric',
        minute: 'numeric',
      }).format()
    }, 1000)
  },
}
</script>

<style scoped>
/*.clockIn {*/
/*  background: linear-gradient(*/
/*    234deg,*/
/*    rgba(3, 224, 227, 1) 0%,*/
/*    rgba(253, 187, 45, 0.4766281512605042) 100%*/
/*  );*/
/*}*/
.clockOut {
  background: linear-gradient(
    280deg,
    rgba(227, 93, 3, 0.7287289915966386) 0%,
    rgba(253, 45, 87, 0.7315301120448179) 100%
  );
}
</style>
