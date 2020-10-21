/* De esta forma se hace con node
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hi World');
});

server.listen(3000, () => {
    console.log("Servidor Iniciado en el Puerto 3000");
}); 
*/

// ORM: Estos nos permiten evitar escribir sintaxis nativa de las bases de datos y manejar todo con javascript. Ejemplo, mongoose o sequelize
const express = require('express');
const morgan = require('morgan');
const app = express();

// Los midleware se suelen usar para cosas como autentificar un usuario antes de que llegue a una ruta para ver si tiene o no acceso a donde quiere ir. Además, los midleware se ejecutan aunque la ruta no corresponda a nuestra pagina. Este se ejecuta antes de las rutas.
/* function logger(req, res, next) {
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}; */

//

// Setting
// Primer parametro = nombre. Segundo parametro = valor 
app.set('nameApp', 'Express Tutorial');
app.set('port', 5000);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(morgan('dev')); 
// app.use(logger);


// Routes

// Esto es una funcionalidad de express que nos permite hacer algo en todas las rutas. Next nos sirve para seguir ejecutando codido y que no se quede en el .all
/* app.all('/user', (req, res, next) => {
    console.log('Siempre Aparezco');
    next();
}); */
app.get('/', (req, res) => {
    // Suponemos BD
    const data = [{name: 'Marta'}, {name:'Marcos'}, {name:'Jorge'}]
    res.render('index.ejs', {gente: data})
}); 

app.get('/user', (req, res) => {
    // Devuelve datos
    res.json({
        name: "Cameron",
        lastname: "Hook",
    });
});

app.post('/user/:id', (req, res) => {
    // Recibir datos 
    console.log(req.body); // Muestra la informacion que nos mandan
    console.log(req.params); // Muestra los parametros de la url, en este caso el id.
    res.send('This is Post');
});

app.put('/user/:id', (req, res) => {
    // Cambiar o actualizar datos
    console.log(req.body);
    res.send(`User ${req.params.id} update`);
});

app.delete('/user/:userId', (req, res) => {
    // Eliminar datos
    res.send(`User ${req.params.userId} deleted`);
});


// Devuelve el HTML
app.use(express.static('public'));

// Escucha o Aloja el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor Listo En El Puerto ${app.get('port')}`)
    console.log(app.get('nameApp'))
});