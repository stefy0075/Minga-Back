import Joi from "joi-oid"

const schema = Joi.object({
    name: Joi.string().required().min(3).max(140).messages({
        "any.required": "Name is a required field.",
        "string.empty": "Name cannot be an empty field.",
        "string.min": "Name must have a minimum length of {#limit}",
        "string.max": "Name must have a maximum length of {#limit}",
        "string.base": "Name must be a type of 'text'",
    }),
    last_name: Joi.string().min(3).max(140),
    city: Joi.string().required().min(3).max(140).messages({
        "any.required": "City is a required field.",
        "string.empty": "City cannot be an empty field.",
        "string.min": "City must have a minimum length of {#limit}",
        "string.max": "City must have a maximum length of {#limit}",
        "string.base": "City must be a type of 'text'",
    }),
    country: Joi.string().required().min(3).max(140).messages({
        "any.required": "Country is a required field.",
        "string.empty": "Country cannot be an empty field.",
        "string.min": "Country must have a minimum length of {#limit}",
        "string.max": "Country must have a maximum length of {#limit}",
        "string.base": "Country must be a type of 'text'",
    }),
    date: Joi.date().messages({
        "date.base": "Date must be a type of 'date'",
    }),
    photo: Joi.string().uri().required().messages({
        "any.required": "Photo is a required field.",
        "string.empty": "Photo cannot be an empty field.",
        "string.base": "Photo must be a type of 'text'",
    })
})

export default schema
