const Joi = require('joi')
const { ValidationError } = require('../../config/errors') 

const UserToDbSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .lowercase()
        .min(3)
        .max(20),
    password: Joi.string()
        .required()
        .trim()
        .min(8),
    role: Joi.string()
        .required()
        .trim(),
    email: Joi.string()
        .required()
        .email({minDomainSegments: 2})
})


module.exports = class UserDTO {

    static toDb(data){
        const validate = UserToDbSchema.validate(data)
        if(validate.error){
            throw new ValidationError(422, validate.error)
        }
        else{
            return validate.value
        }
    }

    static toWeb(data){
        return {
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            shifts: data.shifts,
            teams: data.teams,
            events: data.events
        }
    }

}