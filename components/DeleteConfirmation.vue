<template>
  <v-dialog v-model='dialogDelete' max-width='500px' persistent @keydown.esc='setDialogDelete'>
    <v-card color='grey darken-3'>
      <v-card-title class='text-subtitle-1 justify-center'>
        Are you sure delete this {{item}}?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click='setDialogDelete'>Cancel</v-btn>
        <v-btn
          ref='confirmOk'
          @click='$emit("destroy")'
        >
          OK
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'DeleteConfirmation',
  props: {
    item: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState(['dialogDelete'])
  },
  watch:{
    dialogDelete() {
      setTimeout(() => {
        this.$refs.confirmOk.$el.focus()
      })
    }
  },
  methods: {
    ...mapMutations({
      setDialogDelete: 'setDialogDelete'
    })
  }
}
</script>

<style scoped>

</style>
