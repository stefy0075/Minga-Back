import Chapter from "../../models/Chapter.js";

const get_chapters={
        get: async (req, res, next) => {
        let chapters = {} 
        let pagination = { page: 1}
        if (req.query.manga_id) {
                chapters.manga_id = req.query.manga_id
        }
        if (req.query.page) {
                pagination.page = req.query.page
                pagination.limit=4
        }    

        try{
                let chapter = await Chapter.find(chapters).select('title order manga_id _id cover_photo ')
                .sort({order:1})
                .skip(pagination.page > 0 ? (pagination.page - 1) * pagination.limit : 0)
                .limit(pagination.limit > 0 ? pagination.limit : 0)
                .populate("manga_id","cover_photo")
                if(chapter.length>0){    
                 res.status(200).json({
                        success: true,
                        response: chapter,
                       })    
                }else{
                 res.status(404).json({
                        success: false,
                        response: "Error obtaining Chapter",
                })    
                }    
        }
        catch (error){
        next(error)
                }
        }
}
export default get_chapters
