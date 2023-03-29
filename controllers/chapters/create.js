import Chapter from "../../models/Chapter.js";


const controller = {
    create: async (req, res) => {
        try { 
      
            let chapter = await Chapter.create(req.body)
            return res.status(201).json({
                success: true,
                chapter: chapter,
                id: chapter._id
        
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: 'fail to create',
                body: req.body
            })
        }
    }
}

export default controller