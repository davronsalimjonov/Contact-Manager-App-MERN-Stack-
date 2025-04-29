import asyncHandler from "express-async-handler"
import Contact from "../models/contactModel.js"

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id})
    res.status(200).json(contacts)
})

const createContact = asyncHandler(async (req, res) => {
    console.log(req.user, 'userid');
    
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        throw { status: 400, message: "Please add all fields" }
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id 
    });
    res.status(201).json(contact)
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        throw { status: 404, message: "Contact not found" }
    }
    res.status(200).json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        throw { statusCode: 404, message: "Contact not found" }
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User does not have permission to edit contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        throw { statusCode: 404, message: "Contact not found" }
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User does not have permission to delete contacts")
    }

    await Contact.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "Contact deleted successfully" })
})

export { getContacts, createContact, getContact, updateContact, deleteContact }