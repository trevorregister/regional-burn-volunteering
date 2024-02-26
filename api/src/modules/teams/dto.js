const Joi = require('joi')
const { ValidationError } = require('../../config/errors') 

const TeamToDbSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(20),
    description: Joi.string()
        .required()
        .trim(),
    leads: Joi.array()
        .required()
})


module.exports = class TeamDTO {

    static toDb(data){
        const validate = TeamToDbSchema.validate(data)
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
            shifts: data.shifts,
            leads: data.leads
        }
    }

}