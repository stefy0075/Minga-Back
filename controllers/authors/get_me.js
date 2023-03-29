import Author from "../../models/Author.js"

const get_authors = {
  get_me: async (req, res, next) => {
    console.log(req.body)
    const { author_id } = req.body
      try {
        const author = await Author.findById(author_id)
        res.status(200).json(author)
      } catch (error) {
        return res
        .status(500)
        .json({ 
          message: 'Error getting author information' 
        });
      }
    }
};

export default get_authors;



