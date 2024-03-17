const { HttpError } = require('../../../config/errors')
const client = require('../../client')

module.exports = (repository) => {
    async function execute(id){
        const shifts = await client.shifts.getShiftsByTeam(id)
        return shifts ?? []

    }
    return { execute }
}