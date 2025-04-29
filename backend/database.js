//import mongoose module
import mongoose from "mongoose";

//import config with the variables
import { config } from "./src/config.js";

//create a connection to the database
mongoose.connect(config.db.URI);

//check connection status
const connection = mongoose.connection;

connection.once("open", () => { console.log("Conección del servidor exitosa") });

connection.on("disconnected", () => { console.log("MongoDB connection disconnected") });

connection.on("error", (err) => { console.log("MongoDB connection error: ", err) });  

export {connection};