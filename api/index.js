import express from 'express'
import cors from 'cors'
import ProductosApiRoutes from './routes/products.api.routes.js'
import SesionApiRoutes from './routes/sesion.api.routes.js'
import UsersApiRoutes from './routes/users.api.routes.js'
import PedidosApiRoutes from './routes/pedidos.api.routes.js'

require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json())
app.use('/', ProductosApiRoutes)
app.use('/', SesionApiRoutes)
app.use('/', UsersApiRoutes)
app.use('/', PedidosApiRoutes)

export default app