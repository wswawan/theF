<template>
  <v-layout>
    <v-container>
      <v-row justify="center">
        <v-list-item-title class="text-center pb-2 text-h6">{{
          new Intl.DateTimeFormat('en', {
            month: 'long',
            year: 'numeric',
          }).format(new Date())
        }}</v-list-item-title>
        <v-simple-table>
          <template #default>
            <thead>
              <tr class="text-no-wrap">
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Working</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-list-item-action class="align-center">
                    <v-list-item-action-text>11</v-list-item-action-text>
                    <v-list-item-action-text>Tue</v-list-item-action-text>
                  </v-list-item-action>
                </td>
                <td class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-icon class="mr-0">
                      <v-icon small color="success">mdi-arrow-top-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>11.00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-icon class="mr-0">
                      <v-icon small color="error"
                        >mdi-arrow-bottom-right</v-icon
                      >
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>19.20</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>8hr 20m</td>
              </tr>
              <tr>
                <td>
                  <v-list-item-action class="align-center">
                    <v-list-item-action-text>10</v-list-item-action-text>
                    <v-list-item-action-text>Tue</v-list-item-action-text>
                  </v-list-item-action>
                </td>
                <td class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-icon class="mr-0">
                      <v-icon small color="success">mdi-arrow-top-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>11.00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-icon class="mr-0">
                      <v-icon small color="error"
                        >mdi-arrow-bottom-right</v-icon
                      >
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>19.20</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>8hr 20m</td>
              </tr>
              <tr>
                <td>
                  <v-list-item-action class="align-center">
                    <v-list-item-action-text>9</v-list-item-action-text>
                    <v-list-item-action-text>Tue</v-list-item-action-text>
                  </v-list-item-action>
                </td>
                <td class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-icon class="mr-0">
                      <v-icon small color="success">mdi-arrow-top-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>11.00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-icon class="mr-0">
                      <v-icon small color="error"
                        >mdi-arrow-bottom-right</v-icon
                      >
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>19.20</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>8hr 20m</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {}
</script>

<style></style>
