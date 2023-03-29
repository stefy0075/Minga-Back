import  Company  from "../../models/Company.js"

const controller = {

  read_all_active: async (req, res, next) => {
      try {
          let companyActive = await Company.find({ active: true })
          let companyInactive = await Company.find({ active: false })
          return res.status(200).json({
              success: true,
              companyActive,
              companyInactive,
          })
      } catch (error) {
          next(error);
      }
  }
}

export default controller