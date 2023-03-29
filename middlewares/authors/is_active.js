import Author from "../../models/Author.js"
import Company from "../../models/Company.js"

async function is_active(req, res, next) {
  const author = await Author.findOne({ user_id: req.user._id })
  const company = await Company.findOne({ user_id: req.body.user_id })

  if (author) {
    if (author.active) {
      return next()
    }

    return res.status(400).json({
      success: false,
      message: "You must be an active author to be able to post",
      body: req.body
    })
  } else if (company) {
    if (company.active) {
      return next()
    }

    return res.status(400).json({
      success: false,
      message: "You must be an active company in order to publish.",
      body: req.body
    })
  } else {
    return res.status(404).json({
      success: false,
      message: "The user was not found",
      body: req.body
    })
  }
}

export default is_active
