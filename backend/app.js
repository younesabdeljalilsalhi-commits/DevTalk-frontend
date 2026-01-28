import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import {router as authRoutes} from "./routes/auth.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.43ajopz.mongodb.net/DevTalk?retryWrites=true&w=majority&appName=Cluster0`;


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/auth', authRoutes);

try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT)
    console.log("Connected to DB");
    console.log(`Server is running on localhost:${PORT}`);

} catch(err){
    console.log(err);
}
