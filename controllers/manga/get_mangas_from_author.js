import Manga from "../../models/Manga.js"

const get_mangas= {

    get_mangas_from_author: async (req, res, next) => {
        try {
            const query = {}
            const order = {
                    createdAt: 'desc'
                }

            let mangasLength = 0;

            if (req.params.author_id) { 
                query.author_id = req.params.author_id 
                const mangasPerAuthor = await Manga.countDocuments({ author_id: req.params.author_id });
                mangasLength = mangasPerAuthor
                console.log(mangasLength)
            }

            if (req.query.new === 'false') {
                order.createdAt = 'asc'
            }

            const mangas = await Manga.find(query)
                    .sort(order)
                    .limit(mangasLength < 4 ? 0 : Math.round(mangasLength / 2))
            res.status(201).json({
                success: true,
                response: mangas,
            })
        } catch (error) {
            next(error)
        }
    },
}

export default get_mangas
