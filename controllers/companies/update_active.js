import  Company  from "../../models/Company.js"

const controller = {
  update_active: async (req, res, next) => {
      try {
          let company = await Company.findOneAndUpdate(
              { _id: req.params.id },
              { active: req.body.active },
              { new: true },
          )
          return res.status(200).json({
              success: true,
              company
          })
      } catch (error) {
          return next(error);
      }
  }
}

export default controller;