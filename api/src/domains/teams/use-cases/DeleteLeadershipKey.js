const crypto = require('crypto')
const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(leadershipKeyValue){

        await repository.deleteLeadershipKey(leadershipKeyValue)
    }

    return { execute }
}