<template>
<v-container  align="center">
  <v-sheet  max-height="40%" max-width="40%" color="secondary">
    <v-row justify="center"><v-card j color="primary">asdf</v-card></v-row>
    <v-row v-for="n in 5" :key=n justify="center">{{ n }}
      <v-col v-for="n in 3" :key=n cols="3">
        <v-sheet color="primary" class="pa-2">
          col {{ n }}
        </v-sheet>
      </v-col>
    </v-row>

  </v-sheet>
</v-container>
</template>

<style>

</style>
