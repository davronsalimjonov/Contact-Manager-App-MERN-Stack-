import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the user name"],
            unique: [true, "User name is already taken"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: [true, "Email already exists"]
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be at least 6 characters"]
        }, 
        phone: {
            type: String,
            required: [true, "Please add a phone number"],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: true,
            default: 'user'
        }
    },
    {
        timestamps: true
    }
)

const Users = mongoose.model("Users", userSchema)

export default Users