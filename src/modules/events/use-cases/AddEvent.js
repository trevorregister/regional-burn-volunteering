const Event = require('../model')


module.exports = (repository) => {
    async function execute(name, description, start, end, capacity){
        console.log("🚀 ~ file: AddEvent.js:9 ~ execute ~ start, end:", start, end)
        const event = new Event(name, description, start, end, capacity)
        return await repository.create(event)

    }

    return { execute }
}