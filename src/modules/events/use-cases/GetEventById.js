const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id){
        const event = await repository.getEventById(id)
        if (!event) { throw new HttpError(404, `${id} event not found`) } 
        return event

    }
    return { execute }
}