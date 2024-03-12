<template>
        <v-form>
            <v-text-field
                label="Name"
                v-model="shift.name"
            />
            <v-text-field
                label="Description"
                v-model="shift.description"
            />
            <v-text-field
                label="Day"
                type="date"
                v-model="shift.day"
            />
            <v-text-field
                label="Start Time"
                type="time"
                v-model="shift.startTime"
            />
            <v-text-field
                label="Duration"
                v-model="shift.duration"
            />
            <v-row>
                <v-col>
                    <v-btn>
                        Add Shift
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="cancel">
                        Cancel
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
</template>
<script>
export default {
    name: 'AddShift',
    emits: ['cancel'],
    data() {
        return {
            shift: {
                name: '',
                description: '',
                day: '',
                startTime: '',
                duration: ''
            },
            shifts: []
        }
    },
    methods: {
        cancel(){
            this.name = ''
            this.description = ''
            this.day = ''
            this.startTime = ''
            this.duration = ''
            this.$emit('cancel')
        }
    }
}
</script>
<style>
    
</style>