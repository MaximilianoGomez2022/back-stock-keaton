import express from 'express'
import cors from'cors'
import ProductsApiRoute from './api/routes/products.api.routes.js'
import UserApiRoute from './api/routes/users.api.routes.js'
import SesionApiRoute from './api/routes/sesion.api.routes.js'
import PedidosApiRoute from './api/routes/pedidos.api.routes.js'

const app = express();

require('dotenv').config();

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/', express.static('public'));

app.use('/', ProductsApiRoute)
app.use('/', UserApiRoute)
app.use('/', SesionApiRoute)
app.use('/', PedidosApiRoute)

app.listen(2022, function(){
    console.log('server started in https://localhost:2022');
})


