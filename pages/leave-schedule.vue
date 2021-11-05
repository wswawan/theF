<template>
  <v-row justify="center" class="text-center">
    <v-col cols="12" sm="4">
      <v-list-item-title>
        <v-icon>mdi-car</v-icon>
        Leave Schedule
      </v-list-item-title>
      <v-list-item-content>
        <v-select
          :items="leaveSchedules"
          item-value="id"
          item-text="name"
          label="Set Your For"
          @change="setSelectedSchedule"
        >
          <template #prepend-inner>
            <v-icon color="error">mdi-account-remove-outline</v-icon>
          </template>
        </v-select>
        <v-card-actions v-if="selectedSchedule === 6" class="justify-center">
          <v-btn fab color="info"><v-icon>mdi-camera-outline</v-icon></v-btn>
        </v-card-actions>
        <v-progress-circular
          v-if="selectedSchedule === 5"
          :rotate="180"
          :size="100"
          :width="15"
          :value="8.33 * 11"
          color="info"
          >Rest : {{ 12 - 11 }}</v-progress-circular
        >
        <v-text-field
          v-if="selectedSchedule === 7"
          label="Describe your permission"
        >
          <template #prepend-inner>
            <v-icon color="warning">mdi-note-edit-outline</v-icon>
          </template>
        </v-text-field>
      </v-list-item-content>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    leaveSchedules() {
      return this.schedules.filter((item) => item.group === 'leave')
    },
    ...mapState('schedules', ['schedules', 'selectedSchedule']),
  },
  beforeDestroy() {
    this.$store.commit('schedules/setReset')
  },
  methods: {
    ...mapMutations('schedules', ['setSelectedSchedule']),
  },
}
</script>

<style></style>
