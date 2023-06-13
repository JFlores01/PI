const express = require('express')
const bodyParser  = require('body-parser');
const path = require('path');
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require('dotenv').config()
const port = process.env.PORT|| 3005

//Conexión a la Base de Datos
//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.x8qcnml.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;


mongoose.set('strictQuery', false);

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log(''))
  .catch(e => console.log(e))


//Motor de plantillas
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

//Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));

//Llamadas a las rutas
app.use('/', require('./router/rutas'))
app.use('/index', require('./router/rutas'))


//Error controller
app.use((req, res) => {
    res.status(404).render("404",{
        titulo: "Error 404",
        descripcion: "Page not found"
    })
})
   
   
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})