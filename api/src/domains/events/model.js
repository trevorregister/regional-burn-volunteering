module.exports = class Event {

    constructor(name, description, start, end, capacity){
        
        this.name = name
        this.description = description
        this.teams = []
        this.lead = []
        this.start = start
        this.end = end
        this.capacity = capacity
    }
}
