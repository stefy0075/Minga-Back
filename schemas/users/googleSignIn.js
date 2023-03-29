import Joi from "joi"

const schema = Joi.object({
    mail: Joi
    .string()
    .required()
    .email({ minDomainSegments: 2  }),

    name: Joi 
    .string()
    .required(),
        
    last_name: Joi 
    .string()
    .required(),

    password: Joi
        .string()
        .required(),

    photo: Joi
    .string()
    .required()
    .uri(),
})

export default schema