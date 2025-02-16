import express from 'express';
import { connectDB } from './config/db.mjs';
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.SERVER_PORT
const app = express();

connectDB()

app.listen(port, ()=>{
    console.log (`Server is running in http://localhost:${port}`)
})
