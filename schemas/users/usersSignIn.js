import Joi from "joi"

const schema = Joi.object({
    mail: Joi
        .string()
        .required()
        .min(8)
        .email({ minDomainSegments: 2  })
        .messages({
            'string.min':'the mail must be at least 8 characters long'
        }),
    password: Joi
        .string()
        .required()
        .min(8)
        .max(50)
        .messages({
            'string.min':'the password must be at least 8 characters long',
            'string.max':'the password must have a maximum of 20 characters'
        }),
})

export default schema