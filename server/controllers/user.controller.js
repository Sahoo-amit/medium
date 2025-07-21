import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const register = async(req,res)=>{
    try {
        const { username, email, password, profile_pic } = req.body;
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({msg:"User already exist."})
        }
        const hashedPass = await bcrypt.hash(password,10)
        const newUser = await User.create({email,username,password:hashedPass,profile_pic})
        res.status(200).json({msg:"User created successfully.", id:newUser._id, token: await newUser.generateToken()})
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(404).json({msg:"USer not found."})
        }
        const isMatched = await bcrypt.compare(password,userExist.password)
        if(!isMatched){
            return res.status(400).json({msg:"Invalid credentials."})
        }
        res.status(200).json({msg:"Login successful.", id:userExist._id, token:await userExist.generateToken()})
    } catch (error) {
        console.log(error)
    }
}