import express from 'express'
import { getContacts, createContact, getContact, updateContact, deleteContact } from '../controllers/contactController.js'
import validateToken from '../middleware/validateTokenHandler.js'

const contactsRouter = express.Router()

contactsRouter.use(validateToken)
contactsRouter.route('/').get(getContacts).post(createContact)
contactsRouter.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

export default contactsRouter