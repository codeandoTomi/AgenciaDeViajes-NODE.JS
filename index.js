import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// CONECTAR A BASE DE DATOS.
db.authenticate()
    .then(() => console.log('base de datos conectadaa..'))
    .catch( error => console.log(error));


// DEFINIR PUERTO..
const puerto = process.env.PORT || 4000;


// HABILITAR PUG
app.set('view engine', 'pug');

// OBTENER EL AÑO ACTUAL.
app.use( (request, response, next) => { // req LO QUE ENVIAS AL SERVIDOR. res LO QUE EL SERVIDOR TE ENVIA next YA ESTA TODO LISTO, SEGUIMOS.
    // console.log(response)
    const year = new Date();
    response.locals.ActualYear = year.getFullYear();
    response.locals.nombreSitio = 'Agencia de viajes'
    return next();
})

// AGREGAR BODY PARSER PARA LEER FORMULARIO
app.use(express.urlencoded( { extended: true }))

// DEFINIR LA CARPETA PUBLICA.
app.use(express.static('public'));



// AGREGAR ROUTER
app.use('/', router);


app.listen(puerto, () =>{
    console.log(`El servidor esta funcionando en el puerto ${puerto}`);

});