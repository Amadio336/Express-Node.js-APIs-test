import express from "express";
import { authToken } from "../middlewares/auth.js";


/* controllers imports */
import { getAllUser } from "../controllers/users.js";
import { getUserbyID } from "../controllers/users.js";
import { insertUser } from "../controllers/users.js";
import { deleteUser } from "../controllers/users.js";
import { updateUser } from "../controllers/users.js";



const router = express.Router()




/* insert User */
router.post("/", insertUser )
/* getAlluser */
router.get("/getAllUsers",  getAllUser)
/* getUserbyID */
router.get("/:id", getUserbyID)
/* delete */
router.delete("/deleteUser/:id", deleteUser)
/* patch */
router.patch("/:id", updateUser)





export default router