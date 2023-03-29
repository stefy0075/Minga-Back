import User from "../../models/User.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import transporter from "../../config/verificationMail.js"

const controller = {
  
  sign_up: async (req, res, next) => {
    const user = {
      name: req.body.name,
      mail: req.body.mail,
      password: req.body.password,
      photo: req.body.photo,
      is_online: false,
      is_admin: false,
      is_author: false,
      is_company: false,
      is_verified: false,
      verify_code: crypto.randomBytes(10).toString("hex"),
      password: bcryptjs.hashSync(req.body.password, 10),
    }
    try {
      await User.create(user) 
      
    const frontRoute = process.env.FRONT
    const message = {
      from: process.env.EMAIL_MAILING,
      to: user.mail,
      subject: "User Validation",
      text: "Validate your user by clicking on the following link",
      html: `<p><br>Welcome to Minga App ${user.name} <br>
             <br> Discover manga, manhua and manhwa, track your progress, have fun, read manga. <br> 
             Press the following link to validate your user: <a href="${frontRoute}/${user.verify_code}">Click here</a></p> <br>
             <p style="color: grey;">--<br>
             Kind regards,<br>
             Minga's team<br>
             minga.app@gmail.com<br>
             www.minga.com<br>
             <br>
             Thanks for using our app! If you have any questions or suggestions, please do not hesitate to contact us.<br>
             <br>
             Minga App</p>`
    }
    
    await transporter.sendMail(message)
   
      req.body.success = true
      req.body.sc = 201
      req.body.data = 'User created'
      return res.status(200).json({ message: "User registered!" });
      
    } catch (error) {
      next(error)
    }
  },

  sign_up_google: async (req, res, next) => {
    const data = {
      name: req.body.name,
      last_name: req.body.name,
      mail: req.body.mail,
      photo: req.body.photo,
      is_online: true,
      is_admin: false,
      is_author: false,
      is_company: false,
      is_verified: true,
      password: bcryptjs.hashSync(req.body.password, 10),
    }
    try {
      const user= await User.findOne({
        mail: req.body.mail
      })
      console.log(user)
      if (user){
        user.password = null;
        const token = jsonwebtoken.sign({ id: user._id }, process.env.KSECRET, {
          expiresIn: 60 * 60 * 24,
        });
        return res.status(200).json({ token, user });
      }else{
        const userCreate = await User.create(data)
        userCreate.password = null;
        const token = jsonwebtoken.sign({ id: userCreate._id }, process.env.KSECRET, {
          expiresIn: 60 * 60 * 24,
        });
        return res.status(200).json({ token, user: userCreate });
      }
    } catch (error) {
      next(error)
    }
  },

  sign_in: async (req, res, next) => {
    try {
      let user = await User.findOneAndUpdate(
        { mail: req.user.mail },
        { is_online: true },
        { new: true }
      );
      user.password = null;
      const token = jsonwebtoken.sign({ id: user._id }, process.env.KSECRET, {
        expiresIn: 60 * 60 * 24,
      });
      return res.status(200).json({ token, user });
    } catch (error) {
      next(error);
    }
  },

  sign_out: async (req, res, next) => {
    console.log(req.user);
    const { mail } = req.user;
    try {
      await User.findOneAndUpdate(
        { mail },
        { is_online: false },
        { new: true }
      );
      return res.status(200).json({ message: "User offline!" });
    } catch (error) {
      next(error);
    }
  },

  verifyCode: async (req, res, next) => {
    const { verify_code } = req.params
    try {
        const user = await User.find({ verify_code: verify_code });
        if (user.length > 0) {
            const userId = user[0]._id;
            await User.findOneAndUpdate(
                { _id: userId },
                { is_verified: true },
                { new: true }
            )
            return res.status(200).json({ message: "User successfully verified!!!"});
        } else { 
            return res.status(400).json({ message: "Failed to verify user!!!"});
        }
    } catch (error) {
        next(error)
    }
  },

  token: async (req, res, next) => {
    const { user } = req;

    user.is_admin = null;
    user.is_author = null;
    user.is_company = null;
    user.is_online = null;
    user.is_verified = null;
    user.password = null;
    user.verify_code = null;
    user.updatedAt = null;

    const token = jsonwebtoken.sign({ id: user._id }, process.env.KSECRET, {
      expiresIn: 60 * 60 * 24,
    });
    try {
      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  },
};

export default controller
