import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import doctoresRouter from './src/routes/doctoresRoute.js';
import passwordRecoveryRouter from './src/routes/passwordRecoveryRoutes.js';
import authRouter from './src/routes/authRoutes.js'; // Importar la nueva ruta

const app = express();

//para el middleware
app.use(express.json());

//para las cookies en postman
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
    credentials: true, // Permitir el envío de cookies
}));

app.use("/api/doctores", doctoresRouter);
app.use("/api/passwordRecovery", passwordRecoveryRouter);
app.use("/api/auth", authRouter); // Registrar la nueva ruta

export { app };