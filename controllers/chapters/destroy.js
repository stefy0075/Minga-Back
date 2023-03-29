import Chapter from "../../models/Chapter.js";

const controller={
  destroy: async (req, res, next) => {
    try {
            let { id } = req.params
            let chapter = await Chapter.findOneAndDelete(
                { _id: id },
            )
            if (chapter) {
                return res.status(200).json({
                    succes: true,
                    message: "Chapter successfully deleted",
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Chapter not found"
                })

            }
        } catch (error) {
            next(error)
        }
    }
  }

export default controller