import Chapter from "../../models/Chapter.js";

async function existsOrder (req,res,next){
    const chapter = await Chapter.findOne({manga_id: req.body.manga_id, order: req.body.order})
    if (chapter){
     return res.status(400).json({message:'chapter already exist'})
    } 
    return next()
 }
 
 export default existsOrder