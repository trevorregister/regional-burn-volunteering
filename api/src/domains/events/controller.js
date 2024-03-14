const { 
    AddEvent, 
    UpdateEvent, 
    GetEventById 
} = require('./use-cases/_index')
const {
    IsEventLead
} = require('../auth/use-cases/_index')

const { HttpError } = require('../../config/errors')
const EventDTO = require('./dto')

module.exports = (repository) => {

    const addEvent = async (req, res, next) => {
        try {
            const isEventLeadCase = IsEventLead()
            await isEventLeadCase.execute(req)

            const addEventCase = AddEvent(repository)
            const newEvent = await addEventCase.execute(EventDTO.toDb(req.body))

            res.status(201).send(EventDTO.toWeb(newEvent))
        } catch (err) {
            next(err)
        }
    }

    const getEventById = async (req, res, next) => {
        try {
            const isEventLeadCase = IsEventLead()
            await isEventLeadCase.execute(req)

            const getEventByIdCase = GetEventById(repository)
            const event = await getEventByIdCase.execute(req.params.id)
            if(!event){
                throw new HttpError(404, `${id} event not found`)
            }

            res.status(200).send(EventDTO.toWeb(event))
        } catch (err) {
            next(err)
        }
    }

    const updateEvent = async (req, res, next) => {
        try {
            const isEventLeadCase = IsEventLead()
            await isEventLeadCase.execute(req)
            
            const updateEventCase = UpdateEvent(repository)
            const { id } = req.params
            const update = req.body
            await updateEventCase.execute(id, update)
            
            res.status(201).end()
        } catch (err) {
            next(err)
        }
    }


    return {
        addEvent,
        getEventById,
        updateEvent
    }
}

