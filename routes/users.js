import express from 'express'
import controller from '../controllers/auth/auth.js'
import validator from '../middlewares/validator.js'
import schemaSignUp from '../schemas/users/usersSignUp.js'
import schemaSignIn from '../schemas/users/usersSignIn.js'
import googleSignIn from '../schemas/users/googleSignIn.js'
import accountExistsSignUp from '../middlewares/accountExistsSignUp.js'
import accountExistsSignIn from '../middlewares/accountExistsSignIn.js'
import accountHasBeenVerified from '../middlewares/accountHasBeenVerified.js'
import passwordIsOk from '../middlewares/passwordIsOk.js'
import passport  from '../middlewares/passport.js'
import authorRole from '../controllers/auth/update.js'



const {update} = authorRole
const { sign_up, sign_in, sign_out, token, verifyCode, sign_up_google } = controller

let router = express.Router()

router.post('/signup', accountExistsSignUp, validator(schemaSignUp), sign_up)

router.post('/google', validator(googleSignIn), sign_up_google)

router.post('/signin', accountExistsSignIn, validator(schemaSignIn), accountHasBeenVerified, passwordIsOk, sign_in)

router.post('/token', passport.authenticate('jwt', { session: false}), token)
router.put('/role/author/:id', update )

router.post('/signout', passport.authenticate('jwt', { session: false }), sign_out)

router.get('/verify/:verify_code', verifyCode)




export default router