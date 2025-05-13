import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./routes/usersRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";
import productsRouter from "./routes/productsRouter.js";

dotenv.config();
connectDb();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", usersRouter);

app.use("/api/products", productsRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
