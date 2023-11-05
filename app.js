import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()


let PORT = process.env.PORT || 3113
let app = express()

app.get('/healthcheck', (req, res) => {
    res.status(200).send("<h1>Health OK</h1>")
})

app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`your server is running at http://localhost:${PORT}/healthcheck`)
})