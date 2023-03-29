import Manga from "../../models/Manga.js"


const get_manga={
    get_one: async (req, res, next) => {
        const { id } = req.params
        console.log(id)
        try{
            let comic = await Manga.findById({_id: id},)
            .select("title cover_photo description author_id category_id _id")
            .populate("category_id","name")
            .populate("company_id","name")
            
            if(comic){
                res.status(200).json({
                    success: true,
                    response: comic,
                })
            }else{
                res.status(404).json({
                    success: false,
                    response: "Error obtaining Comic",
                })
            }
            }catch (error) {
            next(error)
            }
    }
}

export default get_manga