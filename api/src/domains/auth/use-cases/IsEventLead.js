const { HttpError } = require('../../../config/errors')

module.exports = () => {
    async function execute(req){
        const { user } = req //user making request        
        if(user.role !== 'event-lead'){
            throw new HttpError(403, 'unauthorized')
        }
    }
    return { execute }
}