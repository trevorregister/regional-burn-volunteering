<template>
  <v-row
    v-for="n in 4"
    :key="n">
    <v-col cols="6">
      <v-card 
      color="red"
      class="pa-2 ma-2"
      >
        col 1
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card 
      color="red"
      class="pa-2 ma-2"
      >
        col 1
      </v-card>
    </v-col>
  </v-row>
</template>

<style>

</style>
