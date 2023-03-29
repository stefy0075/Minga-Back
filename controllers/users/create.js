import User from "../../models/User.js"
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

const controller = {
    create: async (req, res) => {
        try {
            req.body.is_online = false
            req.body.is_admin = false
            req.body.is_author = false
            req.body.is_company = false
            req.body.is_verified = false
            req.body.verify_code = crypto.randomBytes(10).toString('hex')
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
            let user = await User.create(req.body)
            return res.status(201).json({
                success: true,
                user: user,
                id: user._id
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: 'No se pudo crear',
                body: req.body
            })
        }
    }
}

export default controller