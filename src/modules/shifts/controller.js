const {
    AddShift,
    GetShiftById,
    UpdateShift
} = require('./use-cases/_index')
const ShiftDTO = require('./dto')

module.exports = (repository) => {

    const addShift = async (req, res, next) => {
        try {
            const addShiftCase = AddShift(repository)
            const newShift = await addShiftCase.execute(ShiftDTO.toDb(req.body))
            res.status(201).send(ShiftDTO.toWeb(newShift))
        } catch (err) {
            next(err)
        }
    }

    const getShiftById = async (req, res, next) => {
        try {
            const getShiftByIdCase = GetShiftById(repository)
            const shift = await getShiftByIdCase.execute(req.params.id)
            res.status(200).send(ShiftDTO.toWeb(shift))
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

