const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

//Middleware para permitir solicitudes desde frontend
app.use((cors()));

//Middleware para mandar pasar datos por medio del formato JSON en las solicitudes
app.use(express.json());

//Petición GET
app.get('/api/mensaje', (req, res) => {
    res.json({mensaje: "Hola desde el backend"});
});

//POST para recibir los datos desde el frontend
app.post('/api/enviar', (req, res) =>{
    const {mensaje} = req.body;
    if(!mensaje){
        return res.status(400).json({error: 'Necesitamos un mensaje'});
    }
    res.json({respuesta: `El backend recibió ${mensaje}`})
});

app.listen(port, () =>{
    console.log(`El backend está corriendo en http://localhost:${port}`);
});
//Adentro de backend va el modelo vista controlador
//Vistas es para manejar backend