import TeamView from '../views/teams/TeamView.vue'
import TeamsView from '../views/teams/TeamsView.vue'

const teams = [
    {
        path: '/teams',
        name: 'teams',
        component: TeamsView
    },
    {
        path: '/teams/:teamId',
        name: 'team',
        component: TeamView,
        props: true
    }
]

export { teams }