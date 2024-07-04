var express = require('express'); //llamamos a Express
var path = require('path');
var app = express();
const cors = require('cors');
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://localhost:4200'
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };
app.options('*', cors(corsOptions)); 
app.use(function (req, res, next) {
   // res.header("origin", '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Credentials', true");
    next();
});

app.use(express.json());
var port = process.env.PORT || 8080; // establecemos nuestro puerto
var receta_routes = require('./routes/recetaroute');
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Cargamos las rutas
app.use('/api/receta',cors(corsOptions), receta_routes);
// iniciamos nuestro servidor
app.listen(port);
console.log('API escuchando en el puerto ' + port);
