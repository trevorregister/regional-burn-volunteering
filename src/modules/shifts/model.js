module.exports = class Shift {

    constructor(name, description, teamId, start, end, duration, capacity){
        
        this.name = name
        this.description = description
        this.members = []
        this.team = teamId
        this.start = start
        this.end = end
        this.duration = duration
        this.capacity = capacity
    }
}
