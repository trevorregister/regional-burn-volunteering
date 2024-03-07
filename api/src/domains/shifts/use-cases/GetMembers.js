const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id){
        return await repository.getMembers(id)

    }
    return { execute }
}