import express from 'express';
import cookieParser from 'cookie-parser';

import doctoresRouter from './src/routes/doctoresRoute.js';

const app = express();

//para el middleware
app.use(express.json());

//para las cookies en postman
app.use(cookieParser());

app.use("/api/doctores", doctoresRouter);

export {app};