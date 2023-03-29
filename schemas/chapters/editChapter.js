import Joi from "joi";

const schema = Joi.object({
  title: Joi
    .string()
    .min(4)
    .messages({
      'string.min': 'the title must be at least 4 characteres',
      'string.empty': 'the title cannot be empty',
  }),
  order: Joi
    .any(),
  pages: Joi
    .array().items(Joi.string().uri()),
  cover_photo: Joi
    .string().uri()
    .message({
  'string': 'the pages have to be url',
  }),
  data_to_edit: Joi
    .any()
    .messages({
      'any.required': 'the data to edit cannot be empty',
  }),

})
export default schema