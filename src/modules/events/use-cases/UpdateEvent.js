/* const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id, update){
        const shift = await repository.getShiftById(id)
        if( !shift ) { throw new HttpError(404, `shift ${id} not found`) }
        return await repository.updateShift(id, update)

    }
    return { execute }
}

 */