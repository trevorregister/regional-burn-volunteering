class User {
    constructor(id, teams = null){
        this.id = id
        this.teams = teams
        
    }
}

class UserShiftRelation {
    constructor(isLeadingTeam, isRequestingUser){
        this.isRequestingUser = isRequestingUser
        this.isLeadingTeam = isLeadingTeam
    }
}

module.exports = {
    User,
    UserShiftRelation
}