import Joi from "joi-oid"

const schema_comment = Joi.object({
    chapter_id: Joi
        .objectId()
        .required(),

    text: Joi
        .string()
        .min(1)
        .max(200)
        .required()
        .messages({
            'string.min': 'the text must be at least 1 character',
            'string.max': 'the text must not have more than 200 characters',
            'string.required': 'the text is required',
        })
})

export default schema_comment