import Manga from "../../models/Manga.js";


const controller = {

    update_manga: async (req, res, next) => {
        try{
            const manga = await Manga.findOneAndUpdate(
                {_id: req.params?.id},
                req.body,
                {new: true}
            )
            if(manga){
                return  res.status(200)
                           .json({ 
                            success: true,
                            message: "Manga updated!"
                        })
            }

        } catch (error) {
            next(error)
        }

    } 
}

export default controller