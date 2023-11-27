import express from 'express'
import cors from 'cors'
import ProductosApiRoutes from './routes/products.api.routes'
import SesionApiRoutes from './routes/sesion.api.routes'
import UsersApiRoutes from './routes/users.api.routes'

const app = express();

app.use(cors())
app.use(express.json())
app.use('/', ProductosApiRoutes)
app.use('/', SesionApiRoutes)
app.use('/', UsersApiRoutes)

export default app