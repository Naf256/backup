const http = require('http')
const { info, error } = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')
const app = require('./app')

const server = http.createServer(app)
server.listen(PORT, () => {
	info(`server running on port ${PORT}`)
})
