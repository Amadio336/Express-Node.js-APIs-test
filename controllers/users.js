
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/users.js';
import mongoose from 'mongoose';




/* insert User */
export const insertUser = async (req, res) => {
    const userDato = req.body

    const newUser = new User(userDato)

    try{
        await newUser.save()

        res.status(201).json(newUser)

    }catch(error){
        res.status(409).json({message: error.message})

    }
} 


/* getAlluser */
export const getAllUser = async (req, res) => {

    try{

        const usersAvailable = await User.find()

        res.status(200).json(usersAvailable)



    }catch(error){
       
        res.status(404).json({message: error.message})

    }

}


/* get user by id */
export const getUserbyID = async (req, res) => {

    const id = req.params.id

      if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).send("id non conforme")
        return
    }

    try {

        const userSelected = await User.findById(id)

        res.status(200).json(userSelected)
        
    }catch(error){
       
        res.status(404).json({message: error.message})

    }
    


}


/* delete User */
export const deleteUser = async (req, res) =>{
    const id = req.params.id

      try {
        await User.findByIdAndDelete(id)
        res.send(`utente con id ${id} eliminato`)
       
        
    }catch(error){
       
        res.status(404).json({message: error.message})

    }


}





/* update */

export const updateUser = async (req, res) =>{

const id = req.params.id 

const data = {...req.body}



      try {
        const userFound = await User.findByIdAndUpdate(id, data, {new:true })
        res.send(userFound)
        
       
        
    }catch(error){
       
        res.status(404).json({message: error.message})

    }



res.send("utente modificato")


}



