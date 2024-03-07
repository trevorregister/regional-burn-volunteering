import TeamView from "@/domains/teams/views/TeamView.vue"
import TeamsView from "@/domains/teams/views/TeamsView.vue"
import ManageTeamView from "@/domains/teams/views/ManageTeamView.vue"

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
        name: 'manage-team',
        component: ManageTeamView,
        props: true
    }
]

export { teams }