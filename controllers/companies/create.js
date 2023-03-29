import  Company  from "../../models/Company.js"

const controller = {
    create: async (req, res, next) => {
        req.body.active = true
        req.body.user_id = req.user._id
        try {
            const company = await Company.create(req.body)
            res.status(201).json({
                success: true,
                response: company,
            })
        } catch (error) {
           next(error)
        }
    }
}

export default controller

