import User from '../models/User.js'

async function accountExistSignUp(req, res, next) {
    const user = await User.findOne({mail: req.body.mail})
    if (user) {
        return res.status(400).json({message:"User already exist!"})
    }
    return next()
}

export default accountExistSignUp