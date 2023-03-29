import Joi from "joi-oid"

let schema = Joi.object({
    title: Joi
        .string()
        .min(4)
        .max(30)
        .messages({
            "string.min": "The title must be at least 4 characters long",
            "string.max": "The title must have a maximum of 30 characters",
      }),
    cover_photo: Joi
        .string()
        .min(5)
        .uri()
        .messages({
            'string.min': 'The photo must be at least 5 characters',
            'string.empty': 'The photo cannot be empty',
            'string.uri': 'A valid URL is necessary'
        }),
    description: Joi
        .string()
        .min(20)
        .max(500)
        .messages({
            "string.min": "The Description must be at least 20 characters long",
            "string.max": "The description must have a maximum of 500 characters",
      }),
    category_id: Joi
        .objectId()
        .messages({
            'invalid': 'category_id is not an objectId'
        }),
})

export default schema
