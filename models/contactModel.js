import mongoose from "mongoose"

export const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
    }   
},
    {
        timestamps: true,
    }
)

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;