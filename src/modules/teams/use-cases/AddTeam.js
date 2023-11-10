const Team = require('../model')
const { TeamError } = require('../errors')

module.exports = (repository) => {
    async function execute(name, description){
        const team = new Team(name, description)
        return await repository.create(team)
    }

    return { execute }
}