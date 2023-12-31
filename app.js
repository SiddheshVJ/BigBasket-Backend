import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productsRoute from './src/routes/productsRoute'
import userRoutes from './src/routes/userRoutes'

dotenv.config()

let PORT = process.env.PORT || 3113
let MONGO_DB_URL = process.env.MONGO_DB_URL
const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())


// products routers
app.use('/products', productsRoute)
app.use('/user', userRoutes)

// mongoDb connection
mongoose.connect(MONGO_DB_URL)
    .then((response) => {
        console.log("Connected to MongoDB Successful ")
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)  // stop the node js process if unable to connect to DB
    })

app.get('/healthcheck', (req, res) => {
    res.status(200).send("<h1>Health OK</h1>")
})

app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`your server is running at http://localhost:${PORT}/healthcheck`)
})