/* const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id){
        const shift = await repository.getShiftById(id)
        if (!shift) { throw new HttpError(404, `${id} shift not found`) } 
        return shift

    }
    return { execute }
} */