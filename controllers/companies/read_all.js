import Company from "../../models/Company.js";

const controller ={
  read_all: async(req,res,next) =>{

    try{
      let company = await Company.find()
      if(company){
        return res.status(200).json({
          success: true,
          company,
      })
      }else {
        return res.status(400).json({
            success: false,
            message: "Company not found"
        })
    }

    }catch (error){
      next(error);
    }
  }

}

export default controller