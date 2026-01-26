import express from "express";
import cors from "cors";
import connectDb from "./utils/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//import all routes
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app= express();
const PORT = process.env.PORT || 3000;  

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);


connectDb();

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);                                                       
})