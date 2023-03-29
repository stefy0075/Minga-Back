import Manga from "../../models/Manga.js";
import Chapter from "../../models/Chapter.js"


const controller = {

    delete_manga: async (req, res, next) => {
        try{
            
            const manga = await Manga.deleteOne({_id: req.params.id })
            
            if (manga) { 
                const chapters = await Chapter.deleteMany({ manga_id: req.params.id})

            }
            
            return res.status(200)
            .json({ 
                success: true,
                message: "Manga deleted!" })
            
            } catch (error){
                 next(error)
            }

        
    }
}

export default controller