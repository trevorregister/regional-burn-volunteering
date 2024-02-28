const Joi = require('joi')
const { ValidationError } = require('../../config/errors') 
const dateOptions = { dateStyle: "medium", timeStyle: "short"}

const ShiftToDbSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(20),
    description: Joi.string()
        .required()
        .trim(),
    teamId: Joi.string()
        .required()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/),
    start: Joi.date()
        .required(),
    end: Joi.date()
        .required(),
    capacity: Joi.number()
        .required()
        .positive()
        .min(0),
})


module.exports = class ShiftDTO {

    static toDb(data){
        const validate = ShiftToDbSchema.validate(data)
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
            description: data.description,
            members: data.members,
            team: data.team,
            start: data.start.toLocaleString('en-US', dateOptions),
            end: data.end.toLocaleString('en-US', dateOptions),
            duration: data.duration,
            capacity: data.capacity,
            signups: data.signups
        }
    }

}