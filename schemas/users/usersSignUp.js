import Joi from 'joi'

const schema = Joi.object({
    name: Joi
        .string()
        .required()
        .min(3)
        .messages({
            'string.min':'the name must be at least 3 characters long',
        }),
    mail: Joi
        .string()
        .required()
        .min(8)
        .email({ minDomainSegments: 2 })
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
    photo: Joi
        .string()
        .required()
        .min(8)
        .uri()
        .messages({
            'string.min':'the url must be at least 8 characters long'
        }),
})

export default schema