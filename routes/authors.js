import authorCreate from "../controllers/authors/create.js"
import express from "express"
import validator from "../middlewares/validator.js"
import schema_create  from "../schemas/authors/create.js"
import schema_update  from "../schemas/authors/update.js"
import passport from "../middlewares/passport.js"
import get_author from "../controllers/authors/get_one.js"
import get_authors from "../controllers/authors/get_me.js"
import finds_id from "../middlewares/finds_id.js"
import update_author from "../controllers/authors/update.js"
import is_active from "../middlewares/authors/is_active.js"
import user_is_author from "../middlewares/users/user_is_author.js"
import readActive from '../controllers/authors/read_all_active.js'
import updateActive from '../controllers/authors/update_active.js'



const router = express.Router()

const { create } = authorCreate
const { get_one } = get_author
const { get_me } = get_authors
const { update_me } = update_author
const { read_all_active } = readActive
const { update_active } = updateActive



router.post( "/", passport.authenticate("jwt", { session: false }), validator(schema_create), create )

router.put( "/me", passport.authenticate("jwt", { session: false }), validator(schema_update),  finds_id, user_is_author, is_active, update_me )

router.get( "/me", passport.authenticate("jwt", { session: false }), finds_id, user_is_author, get_me )

router.get( "/:id", passport.authenticate("jwt", { session: false }), get_one )


router.get('/admin/prueba', read_all_active)
router.put('/admin/prueba/:id', update_active)




export default router