import  Comment  from '../../models/Comment.js'

const controller = {
    get_comment: async (req, res) => {
        try {
            let query = {}
            if(req.query.chapter_id){
                query.chapter_id = req.query.chapter_id
            }

            let pagination = { page: 1 }
            if (req.query.page) {
                pagination.page = Number(req.query.page)
                pagination.limit = 4
            }

            let skip = pagination.page > 1 ? (pagination.page - 1) * pagination.limit : 0

            let comments = await Comment.find(query)
                .sort({createdAt: 1})
                .skip(skip)
                .limit(pagination.limit > 0 ? pagination.limit : 0)
                .populate('user_id', '_id name photo')

            if(comments){
                return res.status(200).json({
                    success: true,
                    comments
                });
            }else{
                return res.status(404).json({
                    success: false,
                    message: "Comment not found"
                });
            }
        } catch (err) {
            next(err)
        }
    }
}
export default controller