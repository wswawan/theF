<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :fixed="fixed"
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-img max-width='25' max-height='25' src="https://img.icons8.com/ios/50/ffffff/logout-rounded--v1.png"/>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation app grow background-color="primary">
      <v-btn class="text-capitalize" nuxt to="/home">
        <span>home</span>
        <v-img max-height='25' max-width='25' src="https://img.icons8.com/ios/50/ffffff/home.png"/>
      </v-btn>
      <v-btn class="text-capitalize" nuxt to="/attendance">
        <span>attendance</span>
        <v-img max-height='25' max-width='25' src="https://img.icons8.com/ios/50/ffffff/fingerprint.png"/>
      </v-btn>
      <v-btn class="text-capitalize" nuxt to="/setting">
        <span>setting</span>
        <v-img max-height='25' max-width='25' src="https://img.icons8.com/ios/50/ffffff/settings.png"/>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      title: 'Vuetify.js',
    }
  },
}
</script>
