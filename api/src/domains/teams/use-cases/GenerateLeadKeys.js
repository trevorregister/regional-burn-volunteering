const Team = require('../model')
const crypto = require('crypto')

module.exports = (repository) => {
    async function execute(id, quantity){
        const codes = []
        for (let i = 0; i < quantity; i++){
            codes.push(crypto.randomBytes(4).toString('hex'))
        }
        return codes
    }

    return { execute }
}