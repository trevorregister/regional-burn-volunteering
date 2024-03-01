const Team = require('../model')
const crypto = require('crypto')

module.exports = (repository) => {
    async function execute(id, quantity){
        const codes = []
        for (let i = 0; i < quantity; i++){
            codes.push(
                {
                   value:  crypto.randomBytes(4).toString('hex'),
                   isRedeemed: false
                }
            )
        }
        return {
            teamId: id,
            codes: codes
        }
    }

    return { execute }
}