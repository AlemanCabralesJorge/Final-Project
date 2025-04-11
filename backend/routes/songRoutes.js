import express from "express"; //Importación de paquetes
import { getSongInfo } from "../controllers/songController.js"; //se importa la función desde el controlador para acceder a info de la canción

const router = express.Router(); //Enrutador de express para manejar las rutas

router.get("/song", getSongInfo); //método get para obtener info de la canción mediante la función que manda a llamr

export default router; //Se exporta el enrutador
