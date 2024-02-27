import LoginView from '../views/LoginView.vue'
import CreateAccountView from '../views/CreateAccountView.vue'
import DashboardView from '../views/users/DashboardView.vue'

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
        component: () => import('../views/AboutView.vue')
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