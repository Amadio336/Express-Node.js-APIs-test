import { User } from '../models/users.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"



export const register = async (req, res) =>{

    console.log(req.body)
    const email = req.body.email 
    const password = req.body.password

    if (!email) {return res.status(400).json({message:"email non inserita"})}
    else if (!password || password.length < 10){return res.status(400).json({message:"password inesisente o troppo corta"})}


    const hashedPass = await bcrypt.hash(password, 15)

    const user = {
        email: email,
        password: hashedPass,
    }

    const newUser = new User(user)

    try{
        await newUser.save()

        res.status(201).json(user)

    }catch(error){
        res.status(409).json({message: error.message})

    }
        
    

}



export const login = async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    if(!email){return res.status(404).json({status: "error", message: "utente o password errati"})}

    const user = await User.findOne({email})


    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET)
        return res.json({status:"ok", token: token} )
    }

    res.status(400).json({status:"error", messagge:"utente o password non trovati"})


}