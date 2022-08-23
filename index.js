const express = require('express');
const app = express();

const fs = require('fs');
const axios = require('axios');

const { v4: uuidv4 } = require('uuid')

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


//(a)
app.get('/deportes', (req, res) => {
    fs.readFile('deportes.json', 'utf8', (err, deportes) => {
        res.send(deportes);
    });
});

//(b)
app.post('/agregar', (req, res) => {
    
    const { nombre, precio } = req.body;

    if (!nombre || !precio){res.send("Ambos Campos son obligatorios")}
    else{

    const deporte = { nombre, precio };
    console.log(typeof(deporte))
    // obtener la data de nuestro JSON => []
    const data = fs.readFileSync('deportes.json', 'utf8'); // JSON
    console.log(typeof(data))
    const deportes = JSON.parse(data); // Objeto / Arreglo de JS (Acá se llama al json)
    console.log(typeof(deportes))
    deportes.push(deporte);
    fs.writeFileSync('deportes.json', JSON.stringify(deportes), 'utf8',(err,data)=>{
        if(err){res.send("Error al añadir")}
    });
    res.send('Datos ingresados satisfactoriamente');
    

    }

        
    
});

//(d)
app.put("/editar", (req, res) => {
    // Paso 2
    const { nombre, precio } = req.body;
    if (!nombre || !precio){res.send("Debes colocar un valor de precio")}
    else{
        const deporte = { nombre, precio };
    console.log(deporte)
    // Paso 3
    const deporteJSON = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
    //console.log(deporteJSON)
    const deportes = deporteJSON

    newArrayDeportes = deportes.map((b) =>
        b.nombre === nombre ? deporte : b
    );

    // Paso 4
    fs.writeFileSync("deportes.json", JSON.stringify(newArrayDeportes));
    res.send("Modificación Exitosa");
    }
    
});

//(e)

app.delete('/eliminar', (req, res) => {
    const { nombre } = req.query;

    const data = fs.readFileSync('deportes.json', 'utf8'); // JSON
    let deportes = JSON.parse(data); // Objeto / Arreglo de JS

    // opcion 2 => findIndex -> splice
    const index = deportes.findIndex(u => u.nombre === nombre);
    if (index === -1) {
        return res.send('Deporte eliminado');
    }
    deportes.splice(index, 1);

    fs.writeFile('deportes.json', JSON.stringify(deportes), 'utf8', (err, data) => {
        err ?
            res.send('Ocurrio un error al eliminar el deporte') :
            res.send('Deporte Eliminado Con exito');
    });
})

//Ruta Mostrando JSON
app.get("/verRegistros", (req, res) => {

    fs.readFile("deportes.json", "utf8", function (e, data) {
        // Paso 2
        let deporte = JSON.parse(data);
        // Paso 2
        console.log(deporte);
        res.send(deporte);
    });


})





app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000/')
})

module.exports = app;