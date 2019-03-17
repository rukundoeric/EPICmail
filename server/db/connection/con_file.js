// Update with your config settings.
import dotenv from 'dotenv';
dotenv.config();
export default {
    development: {
            host: '127.0.0.1',
            user: process.env.TODO_DB_USER,
            password: process.env.TODO_DB_PW,
            database: 'epicmail'
    },
    production: {
        connection: process.env.DATABASE_URL,
    }
};