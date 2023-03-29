import Author  from "../../models/Author.js"

const authorCreate = {
    create: async (req, res, next) => {
        req.body.active = true
        req.body.user_id = req.user._id
        try {
            const author = await Author.create(req.body)
            res.status(201).json({
                success: true,
                response: author,
            })
        } catch (error) {
            next(error)
        }
    }

}

export default authorCreate