const crypto = require('crypto')
const { HttpError } = require('../../../config/errors')

module.exports = (repository) => {
    async function execute(id, quantity){
        const leadershipKeys = []
        for (let i = 0; i < quantity; i++){
            leadershipKeys.push(
                {
                   value:  crypto.randomBytes(4).toString('hex'),
                   isRedeemed: false,
                   redeemedBy: null
                }
            )
        }

        await repository.addLeadershipCodes(id, leadershipKeys)
    }

    return { execute }
}