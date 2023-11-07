module.exports = class User {

    constructor(user){
        
        this.email = user.email
        this.name = user.name
        this.role = user.role
        this.hash = user.hash
        this.shifts = user.shifts
        this.teams = user.teams
        this.events = user.events
    }
}
