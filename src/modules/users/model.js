module.exports = class User {

    constructor(name, email, role, password){
        
        this.email = email
        this.name = name
        this.role = role
        this.hash = password //hash this
        this.shifts = []
        this.teams = []
        this.events = []
    }
}
