import Manga from '../../models/Manga.js'

const controller = {
    read: async (req, res) => { 

        let pagination = { page: 1, limit: 6 }
        if(req.query.page){ pagination.page = req.query.page }
        if (req.query.quantity){ pagination.limit = req.query.quantity }

        let query = {}
        if(req.query.title){
            query.title = new RegExp(req.query.title.trim(),'i')
            pagination.limit = 10
        }
        if(req.query.category){
            query.category_id = req.query.category.split(",")
            pagination.limit = 10
        }

        let mangas = await Manga.find(query)
            .select("title category_id cover_photo _id")
            .populate("category_id", "name -_id")
            .sort({ title: 1 })
            .skip( pagination.page > 0 ? (pagination.page-1)*pagination.limit : 0 )
            .limit( pagination.limit > 0 ? pagination.limit : 0 )

        return res
            .status(200) 
            .json({
                success: true,
                message: 'You see all the chapters here',
                mangas
            })
    }
}

export default controller