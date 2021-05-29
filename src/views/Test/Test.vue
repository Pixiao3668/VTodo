<template>
  <v-main>
    <template>
      <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
      </v-row>
    </template>
  </v-main>
</template>

<script>
export default {
  name: "Test",
  data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
    }
  },
}
</script>

<style scoped>

</style>
