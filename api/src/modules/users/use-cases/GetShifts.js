const ShiftDTO = require('../../shifts/dto')

module.exports = (repository) => {
    async function execute(id){
        const shifts = await repository.getShifts(id)
        const shiftsResponse = []
        shifts.map(shift => shiftsResponse.push(ShiftDTO.toWeb(shift) ))
        return shiftsResponse
    }
    return { execute }
}

