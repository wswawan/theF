<template>
  <v-container class="fill-height">
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="4">
        <v-list-item-title>
          <v-icon>mdi-car</v-icon>
          Leave Schedule
        </v-list-item-title>
        <v-list-item-content>
          <v-select
            :items="getLeave"
            item-value="id"
            item-text="name"
            label="Set Your For"
            @change="setShiftCode"
          >
            <template #prepend-inner>
              <v-icon color="error">mdi-account-remove-outline</v-icon>
            </template>
          </v-select>
          <v-card-actions v-if="shiftCode === 5" class="justify-center">
            <v-btn fab color="info"><v-icon>mdi-camera-outline</v-icon></v-btn>
          </v-card-actions>
          <v-progress-circular
            v-if="shiftCode === 6"
            :rotate="180"
            :size="100"
            :width="15"
            :value="8.33 * 11"
            color="info"
            >Rest : {{ 12 - 11 }}</v-progress-circular
          >
          <v-text-field
            v-if="shiftCode === 7"
            label="Describe your permission"
          >
            <template #prepend-inner>
              <v-icon color="warning">mdi-note-edit-outline</v-icon>
            </template>
          </v-text-field>
        </v-list-item-content>
        <v-btn color="info">submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getLeave: 'shifts/getLeave'
    }),
    ...mapState('shifts', ['shiftCode']),
  },
  beforeDestroy() {
    this.$store.commit('shifts/setShiftCode')
  },
  methods: {
    ...mapMutations({
      setShiftCode: 'shifts/setShiftCode'
    }),
  },
}
</script>

<style>
.v-list-item__title{
  text-transform: capitalize;
}
</style>
