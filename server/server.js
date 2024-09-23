require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger.js')
const errorHandler = require('./middleware/errorHandler.js')
const cors = require('cors')
const corsOptions = require('./config/corsOptions.js')
const mongodbConn = require('./config/mongodbConn.js')
const mongoose = require('mongoose')

mongodbConn()

const PORT = 3501

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use('/login', require('./routes/loginRoutes.js'))

app.use('/users', require('./routes/userRoutes.js'))

app.use('/posts', require('./routes/postRoutes.js'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')    
})