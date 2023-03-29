import express from 'express'
import showcontroller from "../controllers/categories/show.js"
import passport from "../middlewares/passport.js";


const { all } = showcontroller

let router = express.Router()

router.get("/", passport.authenticate('jwt', { session: false }), all)

export default router
