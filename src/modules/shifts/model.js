module.exports = class Shift {

    constructor(name, description, teamId, start, end, capacity){
        
        this.name = name
        this.description = description
        this.members = []
        this.team = teamId
        this.start = start
        this.end = end
        this.duration = 3 //refactor such that end - start = duration in hours
        this.capacity = capacity
    }
}
