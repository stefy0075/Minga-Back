import controller from "../controllers/companies/create.js"
import readController from '../controllers/companies/read_all.js'
import schema  from "../schemas/companies/create.js"
import express from "express"
import passport from "../middlewares/passport.js"
import validator from "../middlewares/validator.js"
import companyActive from '../controllers/companies/read_all_active.js'
import updateActive from '../controllers/companies/update_active.js'


const router = express.Router()

const { create } = controller
const {read_all} =readController
const {read_all_active} = companyActive
const {update_active} = updateActive

router.post("/",passport.authenticate('jwt', { session: false }), validator( schema ), create)
router.get('/', read_all)
router.get('/admin',read_all_active)
router.put('/admin/:id',update_active)

router.post("/",  passport.authenticate("jwt", { session: false }), validator( schema ), create)

export default router
