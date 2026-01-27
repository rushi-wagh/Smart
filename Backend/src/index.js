import express from "express";
import cors from "cors";
import connectDb from "./utils/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//import all routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import lostFoundRoutes from "./routes/lost-found.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app= express();
const PORT = process.env.PORT || 3000;  

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/lost-found", lostFoundRoutes);
app.use("/api/v1/announcement", announcementRoutes);
app.use("/api/v1/issue", issueRoutes);
app.use("/api/v1/ai", aiRoutes);


connectDb();

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);                                                       
})