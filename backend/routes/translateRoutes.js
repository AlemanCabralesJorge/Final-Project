import express from "express"; //Se importa el paquete
import { translateLyrics } from "../controllers/translateController.js";

const router = express.Router(); //Se crea enritador express para manejar las rutas

router.get("/translate", translateLyrics); //Se hace petición get para traducir la canción

export default router; //See xporta el enrutador
