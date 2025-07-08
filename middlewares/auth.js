import jwt from "jsonwebtoken"

const JWT_SECRET = "12345"


export const authToken = (req, res, next) =>{

    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (token == "null") return res.sendStatus(400)

    jwt.verify(token, process.env.JWT_SECRET, (error, user)=>{
        if(error) return res.sendStatus(401)

      req.user = user 
   
      
      next()
    })

}