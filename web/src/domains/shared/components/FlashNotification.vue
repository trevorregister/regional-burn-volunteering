<template>
    <v-alert
    class="fade-in"
    density="compact"
    style="margin-top: 35px;"
    :type="type"
    closable
    >
        {{ message }}
    </v-alert>
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
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.fade-in {
  animation: fadeIn 1s ease-in;
}   
</style>