import Author from "../../models/Author.js"
import User from "../../models/User.js"

const update_author = {
  update_me: async (req, res, next) => {
    const { author_id } = req.body
    try {
     
      await Author.findByIdAndUpdate(author_id, req.body, {new:true})
      if (typeof req.body.active === "boolean" && req.body.active !== true){
        await User.findByIdAndUpdate(req.user._id, {is_company: false, is_author: false})
      }
      res.status(200).json({
        success: true,
        response: "Author updated successfully",
      })
    } catch (error) {
      next(error)
    }
  },
}

export default update_author
