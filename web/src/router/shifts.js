import ManageShiftView from "@/domains/shifts/views/ManageShiftView.vue"

const shifts = [
    {
        path: '/shifts/:shiftId/manage',
        name: 'manage-shift',
        component: ManageShiftView,
        props: true
    },
]

export { shifts }