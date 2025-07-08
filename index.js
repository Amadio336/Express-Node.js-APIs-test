import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import { authToken } from './middlewares/auth.js';
import dotenv from "dotenv"

/* routes imported */
import usersRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"


const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())


/* routes */
app.get("/", (req, res) =>   res.send("benvenuto nella home"))
app.use("/users", authToken, usersRoutes)
app.use("/auth", authRoutes)


mongoose.connect(process.env.CONNECTION_URL)
.then(() =>{
    
    app.listen(PORT, ()=>{
        console.log("server running on port ", PORT)
    })
})
.catch(error=>console.log(error))
