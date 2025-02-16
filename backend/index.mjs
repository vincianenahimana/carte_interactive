import express from 'express';
import { connectDB } from './config/db.mjs';
import route from './routes/geoRoute.mjs';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const port = process.env.SERVER_PORT
const app = express();

connectDB()

app.use(cors());

app.use(route);

app.listen(port, ()=>{
    console.log (`Server is running in http://localhost:${port}`)
})
