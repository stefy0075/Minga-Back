import  Author  from "../../models/Author.js"
import Manga  from "../../models/Manga.js"
import  Company  from "../../models/Company.js"
import Chapter from '../../models/Chapter.js'

async function chapter_is_property(req, res, next) {
  const chapter = await Chapter.findById(req.params.id)
  const manga = await Manga.findById(chapter.manga_id)
  console.log(chapter._id)
  if (!manga) {
    return res.status(404).json({
      success: false,
      message: "Manga not found",
      body: req.body
    })
  }

  if (req.user.is_author) {
    const author = await Author.findOne({ user_id: req.user._id })

    if (!manga.author_id.equals(author._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this manga",
        body: req.body
      })
    }
  } else if (req.user.is_company) {
    const company = await Company.findOne({ user_id: req.user._id })

    if (!manga.company_id.equals(company._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this manga",
        body: req.body
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to perform this action",
      body: req.body
    })
  }

  return next()
}

export default chapter_is_property