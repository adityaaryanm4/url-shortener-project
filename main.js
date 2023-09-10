import express from 'express'
import * as dotenv from 'dotenv'
import connectDB from './mongodb/connect.js'
import cors from 'cors';

import urlRoutes from './routes/urlRoutes.js'
import homeRoute from './routes/homeRoute.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/shorten', urlRoutes)
app.use('/', homeRoute)

dotenv.config()
const port = process.env.PORT
const url = process.env.MONGO_DB_URL

const startServer = () => {
    app.listen(port, () => console.log(`Server has started on port ${port}`))
}

if (connectDB(url))
    startServer()