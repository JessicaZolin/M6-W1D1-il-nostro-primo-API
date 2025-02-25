import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import authorRouter from "./router/author.routes.js";

// ------------------------------ MODEL ITEMS ------------------------------

const PORT = process.env.PORT || 3002;
const server = express();                           // creating the server


// ------------------------------ MIDDLEWARE ------------------------------

server.use(express.json());                         // is used to parse incoming requests with JSON payloads
server.use(cors())                                  // is used to allow cross-origin requests within the server (connecting the server to the frontend)
server.use("/authors", authorRouter);               // connecting the server to the router



// ------------------------------ MONGODB CONNECTION ------------------------------


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
    console.log('Database connected to MongoDB');
});


mongoose.connection.on('error', (error) => {
    console.log('Error connecting to MongoDB', error);
});



// -------------------------------- LISTEN --------------------------------

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
