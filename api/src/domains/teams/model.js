module.exports = class Team {

    constructor(name, description, leads){
        
        this.name = name
        this.description = description
        this.members = []
        this.shifts = []
        this.leads = leads
        this.leadershipKeys = []
    }
}
