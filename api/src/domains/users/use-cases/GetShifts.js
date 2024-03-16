const ShiftDTO = require('../../shifts/dto')

module.exports = (repository) => {
    async function execute(id){
        return await repository.getShifts(id)
    }
    return { execute }
}

