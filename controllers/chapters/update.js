import Chapter from "../../models/Chapter.js";

const controller={
  update: async(req,res,next)=> {
    try{
      let {id}=req.params
      let chapter =await Chapter.findOneAndUpdate(
        {_id: id },
        req.body,
        { new: true }

      )
      if(chapter){
        return res.status(200).json({
          success: true,
          chapter,
        })
      }else{
        return res.status(404).json({
          success: false,
          message: "Chapter not found"
      })
      }

    }catch(error){
      next(error)
    }
  }
}

export default controller