import nodemailer from 'nodemailer';
import { config } from '../config.js';

/**
 * Configuración del transporter para envío de emails
 */
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.user.EMAIL,
        pass: config.user.PASSWORD
    }
});

/**
 * Envía un email usando nodemailer
 * @param {string} to - Dirección de email del destinatario
 * @param {string} subject - Asunto del email
 * @param {string} text - Contenido en texto plano
 * @param {string} html - Contenido en formato HTML
 * @returns {Promise} Información del email enviado
 * @throws {Error} Si hay un error en el envío
 */

const sendEmail = async (to, subject, text, html) => {
    // Validar parámetros
    if (!to || !subject || (!text && !html)) {
        throw new Error('Missing required email parameters');
    }

    try {
        const info = await transporter.sendMail({
            from: `"Soporte ZacaMed - Alejandro Murcia" <${config.user.EMAIL}>`,
            to,
            subject,
            text,
            html: html || text // Si no hay HTML, usar el texto plano
        });
        
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

const HTMLRecoveryEmail = (code) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <style>
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes pulse {
                0% {
                    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
                }
                50% {
                    box-shadow: 0 0 20px rgba(0, 123, 255, 0.8);
                }
                100% {
                    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
                }
            }

            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f8fb;
                color: #333;
            }

            .container {
                max-width: 600px;
                margin: 30px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                animation: fadeIn 1s ease-in-out;
            }

            .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #e0e0e0;
            }

            .logo {
                font-size: 32px;
                font-weight: bold;
                color: #007bff;
                text-transform: uppercase;
            }

            h1 {
                font-size: 24px;
                color: #333;
                margin: 20px 0;
            }

            p {
                font-size: 16px;
                line-height: 1.6;
                color: #555;
            }

            .code-container {
                text-align: center;
                margin: 30px 0;
            }

            .code {
                display: inline-block;
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                background-color: #f0f8ff;
                padding: 15px 30px;
                border-radius: 8px;
                animation: pulse 1.5s infinite;
            }

            .button {
                display: block;
                text-align: center;
                margin: 20px auto;
                padding: 15px 30px;
                background-color: #007bff;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 5px;
                box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
                transition: background-color 0.3s ease, transform 0.3s ease;
            }

            .button:hover {
                background-color: #0056b3;
                transform: scale(1.05);
            }

            .footer {
                text-align: center;
                font-size: 12px;
                color: #888;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
            }

            .warning {
                color: #d9534f;
                font-size: 14px;
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">ZacaMed Hospital</div>
            </div>
            <h1>Recuperación de Contraseña</h1>
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Por favor, utiliza el siguiente código para completar el proceso:</p>
            <div class="code-container">
                <div class="code">${code}</div>
            </div>
            <p>Este código expirará en 15 minutos por razones de seguridad. Si no solicitaste este cambio, ignora este mensaje.</p>
            <a href="#" class="button">Restablecer Contraseña</a>
            <div class="warning">
                * No compartas este código con nadie. Nuestro equipo nunca te pedirá este código.
            </div>
            <div class="footer">
                © ${new Date().getFullYear()} ZacaMed Hospital. Todos los derechos reservados.<br>
                Este es un mensaje automático, por favor no responder.
            </div>
        </div>
    </body>
    </html>
    `;
};

// Verificar la conexión al iniciar
transporter.verify()
    .then(() => console.log('SMTP connection successful'))
    .catch(error => console.error('SMTP connection error:', error));

export {sendEmail, HTMLRecoveryEmail};