const Team = require('../model')
const { TeamError } = require('../errors')

module.exports = (repository) => {
    async function execute({name, description, leads}){
        const team = new Team(name, description, leads)
        return await repository.create(team)
    }

    return { execute }
}