class User {
    constructor(id){
        this.id = id
        
    }
}

class UserShiftRelation {
    constructor(isLeadingTeam, isRequestingUser){
        this.isRequestingUser = isRequestingUser
        this.isLeadingTeam = isLeadingTeam
    }
}

class Shift {
    constructor(isLeadingTeam){
        this.isLeadingTeam = isLeadingTeam
    }
}

class Team {
    constructor(isLeadingTeam){
        this.isLeadingTeam = isLeadingTeam
    }
}

module.exports = {
    User,
    UserShiftRelation,
    Shift,
    Team
}