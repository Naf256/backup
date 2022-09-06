const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

logger.info('connecting to MongoDB', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => logger.info('connected to MongoDB'))
	.catch(error => {
		logger.error('error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
