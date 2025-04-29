import express from 'express'
import dotenv from 'dotenv'
import contactsRouter from './routes/contactRoutes.js'
import errorHandler from './middleware/errorHandler.js';
import { connectDb } from './config/dbConnection.js';
import usersRouter from './routes/usersRoutes.js';

dotenv.config();
connectDb()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})