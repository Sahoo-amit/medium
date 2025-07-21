import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(404).json({msg:"Token not found."})
    }
    const token = authHeader.replace("Bearer ","").trim()
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
         const userData = await User.findOne({ email: decoded.email });
         if (userData === null) {
           return res.status(409).json({ msg: `User not found` });
         }
         req.user = userData;
         req.id = userData._id;
         req.token = decoded;
         next();
    } catch (error) {
        console.log(error)
    }    
}