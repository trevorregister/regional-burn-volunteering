const AddTeam = require('./AddTeam')
const GetTeamById = require('./GetTeamById')
const UpdateTeam = require('./UpdateTeam')
const AddLead = require('./AddLead')
const RemoveLead = require('./RemoveLead')
const GetTeams = require('./GetTeams')
const GetShifts = require('./GetShifts')
const GenerateLeadKeys = require('./GenerateLeadKeys')
const DeleteLeadershipKey = require('./DeleteLeadershipKey')

module.exports = {
    AddTeam,
    GetTeamById,
    UpdateTeam,
    AddLead,
    RemoveLead,
    GetTeams,
    GetShifts,
    GenerateLeadKeys,
    DeleteLeadershipKey
}