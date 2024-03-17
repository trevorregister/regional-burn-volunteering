const builder = require('../../builder')
const request = require('../setup')

describe('promoteUserToLead', () => {

    it('given request from event lead, returns 204, changes user role to lead, adds user to team leads', async () => {
        const user = await builder.user()
        const eventLead = await builder.user({role: 'event-lead'})
        const team = await builder.team()
        const token = builder.token(eventLead)
        const res = await request.users.patch(`/${user._id}/promote-user-to-lead`, {teamId: team._id}, token)
        expect(res.status).toBe(204)
        const updatedUser = await builder.userRepo.getUserById(user._id)
        const updatedTeam = await builder.teamRepo.getTeamById(team._id)
        expect(updatedUser.role).toBe('lead')
        expect(updatedUser.teams).toContainEqual(team._id)
        expect(updatedTeam.leads).toContainEqual(user._id)
    })

    it('given request from non-event-lead, returns 403', async () => {
        const user = await builder.user()
        const team = await builder.team()
        const token = builder.token(user)
        const res = await request.users.patch(`/${user._id}/promote-user-to-lead`, {teamId: team._id}, token)
        expect(res.status).toBe(403)
    })
})