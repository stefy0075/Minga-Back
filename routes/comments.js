import express from 'express'
import commentController from '../controllers/comments/create.js'
import passport from '../middlewares/passport.js'
import validator from '../middlewares/validator.js'
import schema from '../schemas/comments/comments.js'
import updateController from '../controllers/comments/update.js'
import destroyController from '../controllers/comments/destroy.js'
import getController from '../controllers/comments/all_from_chapter.js'
import propertyOf from '../middlewares/comments/is_property_of.js'


const router = express.Router()

const { create } = commentController
const { update } = updateController
const { destroy } = destroyController
const { get_comment } = getController

router.post('/', passport.authenticate('jwt', { session: false }), validator(schema), create)
router.put("/:id", passport.authenticate("jwt", { session: false }), validator(schema), propertyOf, update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), propertyOf, destroy)
router.get("/", passport.authenticate('jwt', { session:false }), get_comment)



export default router