<template>
  <v-btn color="white" class="text-primary">
    {{ label }}
  </v-btn>
</template>
<script>
export default {
  name: 'ActionButton',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
