import Comment from "../../models/Comment.js";


const controller = {

    destroy: async (req, res, next) => {
        try {
            let { id } = req.params
            await Comment.deleteOne(
                { _id: id }
            )
            return res.status(200).json({
                message: 'Comentario eliminado'
            })
        } catch (error) {
            next(error)
        }
    }
}


export default controller;