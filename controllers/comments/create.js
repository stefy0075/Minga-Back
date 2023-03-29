import Comment from '../../models/Comment.js'

const controller = {

    create: async (req, res, next) => {
        try {
            req.body.user_id = req.user._id
            if(req.query.chapter_id){
                req.body.chapter_id = req.query.chapter_id
            }
            let comment = await Comment.create(req.body)
            res.status(201).json({
                success: true,
                response: { text: comment.text, _id: comment._id}
            })

        } catch (error) {
            next(error)
        }
    }

}
export default controller