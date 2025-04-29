import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

//para el middleware
app.use(express.json());

//para las cookies en postman
app.use(cookieParser());

export {app};