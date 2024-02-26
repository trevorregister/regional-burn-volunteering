const { HttpError } = require('../../../config/errors')
const { ShiftService } = require('../../services')

const shiftService = new ShiftService()

module.exports = (repository) => {
    async function execute(id){
        const shifts = await shiftService.getShiftsByTeam(id)
        return shifts ?? []

    }
    return { execute }
}