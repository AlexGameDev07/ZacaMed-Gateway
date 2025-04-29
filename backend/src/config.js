import dotenv from 'dotenv';
dotenv.config();
export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    jwt: {
        JWT_SECRET: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES
    },
    admin:{
        EMAIL: process.env.ADMIN_EMAIL,
        PASSWORD: process.env.ADMIN_PASSWORD
    },
    user:{
        EMAIL: process.env.EMAIL_USER,
        PASSWORD: process.env.EMAIL_USER_PASSWORD
    }
}