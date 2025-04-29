import express from 'express'
import { currentUser, loginUser, registerUser } from '../controllers/userController.js'
import validateToken from '../middleware/validateTokenHandler.js'

const usersRouter = express.Router()

usersRouter.post("/register", registerUser)
usersRouter.post("/login", loginUser)
usersRouter.get("/currentUser", validateToken, currentUser)

export default usersRouter