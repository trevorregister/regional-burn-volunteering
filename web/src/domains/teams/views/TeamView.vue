<template>
    <shift-table :teamId="teamId">

    </shift-table>
</template>
<script>
/* import { client } from '../../../../api-client/client'
import { initUserStore } from '@/stores/user' */
import ShiftTable from '../../shifts/components/ShiftTable.vue'

export default {
    components: {
        ShiftTable
    }
        ,
    data() {
        return {
            teamId: this.$route.params.id
        }
    },
    methods: {
        async load() {
    }

    },
    async created() {
        await this.load()
    }
}
</script>
<style>
</style>