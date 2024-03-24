<template>
  <v-alert
    class="flash-alert"
    :text="message"
    density="compact"
    style="margin-top: 35px; position: fixed; width: 75%; z-index: 1000"
    :type="type"
    closable
  />
</template>
<script>
export default {
  name: 'FlashNotification',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss">
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.flash-alert {
  animation: fadeIn 1s ease-in;
  margin-top: 35px;
  position: fixed;
  width: 75%;
  z-index: 1000;
}
</style>
