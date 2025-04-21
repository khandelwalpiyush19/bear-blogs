import express from "express";
import connectDB from "./db/databse.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app  = express();

dotenv.config();

const PORT = process.env.PORT || 3000

connectDB();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/blog",blogRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
