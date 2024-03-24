import ManageUserView from '@/domains/users/views/ManageUserView.vue'

const users = [
  {
    path: '/users/:userId/manage',
    name: 'manage-user',
    component: ManageUserView,
    props: true
  }
]

export { users }
