const {
    AddShift,
    GetShiftById,
    UpdateShift,
    Signup,
    Unsignup,
    GetMembers,
    DeleteShift
} = require('./use-cases/_index')
const {
    CanUpdateUserShiftRelation,
    CanModifyShift,
    CanReadShiftMembers
} = require('../auth/use-cases/_index')

const ShiftDTO = require('./dto')
const UserDTO = require('../users/dto')

module.exports = (repository) => {

    const addShift = async (req, res, next) => {
        try {
            const canModifyShiftCase = CanModifyShift()
            await canModifyShiftCase.execute(req)

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

    const getMembers = async (req, res, next) => {
        try {
            const canReadShiftMembersCase = CanReadShiftMembers()
            await canReadShiftMembersCase.execute(req)

            const getMembersCase = GetMembers(repository)
            const { id } = req.params
            let members = await getMembersCase.execute(id)
            members = members.map(member => member = UserDTO.toWeb(member))

            res.status(200).send(members)
        } catch (err) {
            next(err)
        }
    }

    const updateShift = async (req, res, next) => {
        try {
            const canModifyShiftCase = CanModifyShift()
            await canModifyShiftCase.execute(req)

            const updateShiftCase = UpdateShift(repository)
            const { id } = req.params
            const update = req.body
            await updateShiftCase.execute(id, update)

            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }

    const signup = async (req, res, next) => {
        try {
            const canUpdateUserShiftRelationCase = CanUpdateUserShiftRelation()
            await canUpdateUserShiftRelationCase.execute(req)

            const signupCase = Signup(repository)
            const { id } = req.params
            const { userId } = req.body

            await signupCase.execute(userId, id)
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }

    const unsignup = async (req, res, next) => {
        try {
            const canUpdateUserShiftRelationCase = CanUpdateUserShiftRelation()
            await canUpdateUserShiftRelationCase.execute(req)

            const unsignupCase = Unsignup(repository)
            const { id } = req.params
            const { userId } = req.body
            await unsignupCase.execute(userId, id)
            
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }

    const deleteShift = async (req, res, next) => {
        try {
            const canModifyShiftCase = CanModifyShift()
            await canModifyShiftCase.execute(req)

            const deleteShiftCase = DeleteShift(repository)
            const { id } = req.params
            await deleteShiftCase.execute(id)
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }


    return {
        addShift,
        getShiftById,
        updateShift,
        signup,
        unsignup,
        getMembers,
        deleteShift
    }
}

