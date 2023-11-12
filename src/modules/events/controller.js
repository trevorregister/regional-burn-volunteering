const { AddEvent, UpdateEvent, GetEventById } = require('./use-cases/_index')
const { HttpError } = require('../../config/errors')

module.exports = (repository) => {

    const addEvent = async (req, res, next) => {
        try {
            const addEventCase = AddEvent(repository)
            const { name, description, start, end, capacity } = req.body
            const newEvent = await addEventCase.execute(name, description, start, end, capacity)
            res.status(201).send(newEvent)
        } catch (err) {
            next(err)
        }
    }

    const getEventById = async (req, res, next) => {
        try {
            const getEventByIdCase = GetEventById(repository)
            const { id } = req.params
            const event = await getEventByIdCase.execute(id)
            if(!event){
                throw new HttpError(404, `${id} event not found`)
            }
            res.status(200).send(event)
        } catch (err) {
            next(err)
        }
    }

    const updateEvent = async (req, res, next) => {
        try {
            const updateEventCase = UpdateEvent(repository)
            const { id } = req.params
            const update = req.body
            await updateEventCase.execute(id, update)
            res.status(201).send('updated')
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

