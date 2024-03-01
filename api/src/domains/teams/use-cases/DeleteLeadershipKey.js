const crypto = require('crypto')
const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(leadershipKeyValue){

        const deleteLeadershipKeySuccess = await repository.deleteLeadershipKey(leadershipKeyValue)
        if(!deleteLeadershipKeySuccess){
            throw new HttpError(404, `leadership code ${leadershipKeyValue} not found`)
        }
    }

    return { execute }
}