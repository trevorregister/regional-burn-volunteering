module.exports = class User {

    constructor(name, email, role, password){
        
        this.email = email
        this.name = name
        this.role = 'user'
        this.hash = password
        this.shifts = []
        this.events = []
    }
}
