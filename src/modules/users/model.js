module.exports = class User {

    constructor(name, email, role, password){
        
        this.email = email
        this.name = name
        this.role = role
        this.hash = password //salt+pepper in the repo
        this.shifts = []
        this.teams = []
        this.events = []
    }
}
