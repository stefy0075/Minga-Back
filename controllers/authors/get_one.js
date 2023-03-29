import  Author  from "../../models/Author.js"


const get_author= { 
    get_one:  async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    try {
        let author = await Author.find({_id: id}, "-_id -user_id")
        if (author.length > 0) {
            res.status(200).json({
                success: true,
                response: author,
            })
        } else {
            res.status(400).json({
                success: false,
                response: "Error obtaining Author",
            })
        }
    } catch (error) {
        next(error)
    }
  }
}

export default get_author