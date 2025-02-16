import pkg from 'pg';
const { Client } = pkg;
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const client = new Client({
    user:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    port:DB_PORT,
    database:DB_NAME
})

export async function connectDB () {
    try {
        await client.connect ()
        console.log('🔌 ✅ Connected to PostgreSQL database')

    } catch (error) {
    console.error('🔴 Connection error', error)
    }

}

export async function disconnectDB () {
    try {
        await await client.end();
        console.log('🔌 ❌ Disconnected from PostgreSQL database')

    } catch (error) {
    console.error('🔴 Disconnection error', error)
    }

}

export default client