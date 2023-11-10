const AddShift = require('./use-cases/AddShift')
const GetShiftById = require('./use-cases/GetShiftById')
const UpdateShift = require('./use-cases/UpdateShift')

module.exports = (repository) => {

    const addShift = async (req, res, next) => {
        try {
            const addShiftCase = AddShift(repository)
            const { name, description, teamId, start, end, capacity } = req.body
            const newShift = await addShiftCase.execute(name, description, teamId, start, end, capacity)
            res.status(201).send(newShift)
        } catch (err) {
            next(err)
        }
    }

    const getShiftById = async (req, res, next) => {
        try {
            const getShiftByIdCase = GetShiftById(repository)
            const { id } = req.params
            const shift = await getShiftByIdCase.execute(id)
            res.status(200).send(shift)
        } catch (err) {
            next(err)
        }
    }

    const updateShift = async (req, res, next) => {
        try {
            const updateShiftCase = UpdateShift(repository)
            const { id } = req.params
            const update = req.body
            await updateShiftCase.execute(id, update)
            res.status(201).send('updated')
        } catch (err) {
            next(err)
        }
    }


    return {
        addShift,
        getShiftById,
        updateShift
    }
}

