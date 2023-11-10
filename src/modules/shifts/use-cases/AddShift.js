/* const Team = require('../model')
const { TeamError } = require('../errors')

module.exports = (repository) => {
    async function execute(name, description){
        const team = new Team(name, description)
        return await repository.create(team)
    }

    return { execute }
} */

const Shift = require('../model')
const { HttpError } = require('../../../config/errors')


module.exports = (repository) => {
    async function execute(name, description, teamId, start, end, capacity){
        const shift = new Shift(name, description, teamId, start, end, capacity)
        return await repository.create(shift)

    }

    return { execute }
}