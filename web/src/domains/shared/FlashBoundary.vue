<template>
        <div v-for="flash in flashes" :key="flash">
            <flash-notification :message="flash.message" :type="flash.type" />
        </div>
</template>
<script>
import FlashNotification from './components/FlashNotification.vue'

export default {
    name: 'FlashBoundary',
    components: {
        FlashNotification
    },
    data() {
        return {
            flashes: []
        }
    },
    provide() {
        return {
            $flash: this.$flash
        }
    },
    methods: {
        $flash(message, type) {
            console.log('flash')
            this.flashes.push({
                message: message,
                type: type
            })
            setTimeout(() => {
                this.flashes.pop()
            }, 5000)
        }
    },
    created(){
        this.$flash('Welcome to the app!', 'success')
    }
}
</script>
<style>
    
</style>