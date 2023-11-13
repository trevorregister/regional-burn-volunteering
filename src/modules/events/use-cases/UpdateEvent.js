const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id, update){
        const event = await repository.getEventById(id)
        if( !event ) { throw new HttpError(404, `event ${id} not found`) }
        return await repository.updateEvent(id, update)

    }
    return { execute }
}

