<template>
  <div>
    <v-list v-if='items.length' dense>
      <v-list-item v-for='(item, index) in items' :key='index'>
        <v-list-item-content>
          <v-list-item-title class='text-capitalize'>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle v-if='item.role' class='text-caption'>{{ item.role }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon class='mx-auto'>
          <v-icon color='warning' class='mr-2' @click='$emit("editedItem", item)'>mdi-pencil</v-icon>
          <v-icon color='error' @click='$emit("dialogDelete", item)'>mdi-delete</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class='text-center'>No data available</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'EmployeeList',
  props: {
    items: {
      type: Array,
      default: () => null
    }
  }
}
</script>

<style scoped>

</style>
