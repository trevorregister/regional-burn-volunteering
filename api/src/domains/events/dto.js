const Joi = require('joi')
const { ValidationError } = require('../../config/errors') 

const EventToDbSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(20),
    description: Joi.string()
        .required()
        .trim(),
    start: Joi.date()
        .required(),
    end: Joi.date()
        .required(),
    capacity: Joi.number()
        .required()
        .positive()
        .min(0)
})


module.exports = class EventDTO {

    static toDb(data){
        const validate = EventToDbSchema.validate(data)
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
            start: data.start,
            end: data.end,
            capacity: data.capacity
        }
    }

}