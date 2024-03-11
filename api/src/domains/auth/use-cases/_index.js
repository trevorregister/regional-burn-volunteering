const CanReadUser  = require('./CanReadUser')
const CanUpdateUserShiftRelation = require('./CanUpdateUserShiftRelation')
const CanModifyShift = require('./CanModifyShift')
const CanCreateTeam = require('./CanCreateTeam')
const CanUpdateTeam = require('./CanUpdateTeam')
const CanModifyTeamLeadership = require('./CanModifyTeamLeadership')
const CanReadShiftMembers = require('./CanReadShiftMembers')
const IsEventLead = require('./IsEventLead')

module.exports = {
    CanReadUser,
    CanUpdateUserShiftRelation,
    CanModifyShift,
    CanCreateTeam,
    CanUpdateTeam,
    CanModifyTeamLeadership,
    CanReadShiftMembers,
    IsEventLead

}