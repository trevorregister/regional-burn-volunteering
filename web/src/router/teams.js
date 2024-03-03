import TeamView from '../views/teams/TeamView.vue'
import TeamsView from '../views/teams/TeamsView.vue'
import ManageTeamView from '../views/teams/ManageTeamView.vue'

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
    },
    {
        path: '/teams/:teamId/manage',
        name: 'manageTeam',
        component: ManageTeamView,
        props: true
    }
]

export { teams }