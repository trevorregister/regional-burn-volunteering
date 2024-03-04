import LoginView from '@/domains/users/views/LoginView.vue'
import CreateAccountView from '@/domains/users/views/CreateAccountView.vue'
import DashboardView from '@/domains/users/views/DashboardView.vue'

const root = [     
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../domains/shared/AboutView.vue')
    },
    {
        path: '/create-account',
        name: 'create-account',
        component: CreateAccountView
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView
    },
]

export { root }