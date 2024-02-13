const ShiftDTO = require('../../shifts/dto')

module.exports = (repository) => {
    async function execute(id){
        const shiftsResponse = await repository.getShifts(id)
        const shifts = shiftsResponse[0].shifts
        const shiftData = []
        shifts.map(shift => shiftData.push(ShiftDTO.toWeb(shift) ))
        return shiftData
    }
    return { execute }
}

