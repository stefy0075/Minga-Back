import Manga from "../../models/Manga.js";


const controller = {

    get_me: async (req, res, next) => {

        try {

            let pagination = { page: 1, limit: 6 }
            if (req.query.page) { pagination.page = req.query.page }
            if (req.query.quantity) { pagination.limit = req.query.quantity }

            let query = {}
            if (req.query.title) {
                query.title = new RegExp(req.query.title.trim(), 'i')
                pagination.limit = 10
            }
            if (req.query.category) {
                query.category_id = req.query.category.split(",")
                pagination.limit = 10
            }

            query.author_id = req.body.author_id
            console.log(query)
            const mangas = await Manga.find(query)
                .select("_id author_id title cover_photo category_id ")
                .populate("author_id", "name last_name -_id")
                .populate("category_id", "name -_id")
                .sort({ title: 1 })
                .skip( pagination.page > 0 ? (pagination.page-1)*pagination.limit : 0 )
                .limit( pagination.limit > 0 ? pagination.limit : 0 )


            if (mangas) {
                return res.status(200).json({
                    success: true,
                    mangas
                })
            }

        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}


export default controller 