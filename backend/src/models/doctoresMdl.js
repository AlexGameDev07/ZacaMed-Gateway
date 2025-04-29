/**
 * Modelo de datos para doctores
 * Nombre
 * Especialidad
 * Correo electrónico (único)
 * Contraseña (encriptada)
 */

import { Schema, model } from "mongoose";

const doctoresSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        especialidad: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("Doctores", doctoresSchema);