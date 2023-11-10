module.exports = class Team {

    constructor(name, description){
        
        this.name = name
        this.description = description
        this.members = []
        this.shifts = []
        this.leads = []
    }
}
