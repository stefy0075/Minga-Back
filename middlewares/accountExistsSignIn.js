import User from '../models/User.js'

async function accountExistSignIn(req, res, next) {
    const user = await User.findOne({mail: req.body.mail})
    if (user) {
        req.user = {
            id: user._id,
            mail: user.mail,
            photo: user.photo,
            password: user.password,
            is_admin: user.is_admin,
            is_author: user.is_author,
            is_company: user.is_company,
            is_verified: user.is_verified
        }
        return next()
    }
    return res.status(400).json({message: "Wrong credentials!"})
}

export default accountExistSignIn