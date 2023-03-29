import Comment from "../../models/Comment.js";


const controller = {

    update: async (req, res, next) => {
        try {
            let { id } = req.params
            let update = await Comment.findOneAndUpdate(
                { _id: id },
                req.body,
                { new: true }
            ).select('text')

            return res.status(200).json({update})

        } catch (error) {
            next(error)
        }
    },



}


export default controller