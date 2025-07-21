import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    photoUrl : {type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"},
})

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
          {
            email: this.email,
          },
          process.env.JWT_SECRET,
          {expiresIn: '1h'}
        )
    } catch (error) {
        console.log(error)
    }
}

export const User = mongoose.model('User',userSchema)