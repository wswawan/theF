<template>
  <div>
    <v-list v-if='shifts.length' dense>
      <v-list-item v-for='(shift, index) in shifts' :key='index' dense>
        <v-list-item-content>
          <v-list-item-title class='text-capitalize'>{{ shift.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ shift.in }} - {{ shift.out }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon class='mx-auto'>
          <v-icon class='mr-3' color='warning' @click='$emit("edit", shift)'>mdi-pencil</v-icon>
          <v-icon color='error' @click='$emit("destroy", shift)'>mdi-delete</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    <v-list v-else dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class='text-center'>No data available</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-fab-transition>
      <v-btn fab fixed bottom right class='mb-15' @click='$emit("create")'>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>

</template>

<script>
export default {
  name: 'ShiftList',
  model: {
    event: ['create', 'edit', 'destroy']
  },
  props: {
    shifts: {
      type: Array,
      default: () => null
    }
  }
}
</script>

<style scoped>

</style>
