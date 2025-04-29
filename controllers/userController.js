import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Users from "../models/userModel.js"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, phone } = req.body
    if (!username || !email || !password || !phone) {
        throw { status: 400, message: "Please add all fields" }
    }
    const userAvailable = await Users.findOne({
        $or: [{ username }, { email }]
    })

    if (userAvailable) {
        throw { status: 400, message: "User already registered" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await Users.create({
        username,
        email,
        password: hashedPassword,
        phone
    })

    if (user) {
        
        res.status(201).json({ user_id: user.id, username: user.username, email: user.email })
    } else {
        throw { status: 400, message: "User Status is not valid" }
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw { status:400, message: "Please add all fields" }
    }

    const user = await Users.findOne({ email })

    if ( user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                id: user._id, 
                username: user.username,
                email: user.email
            }
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        })
        res.status(200).json({ accessToken })
    } else {
        throw { status:401, message: "Email or password is not valid" }
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

export { registerUser, loginUser, currentUser }