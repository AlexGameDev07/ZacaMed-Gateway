import { app } from "./app";
import { config } from "./src/config.js";
import { database } from "./database.js";

async function main() {
    const PORT = config.server.PORT;
    app.listen(PORT);
    console.log(`Servidor conectado`);
}

main().catch((err) => {
    console.error("Error al iniciar el servidor:", err);
});