const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Register = require('./models/person')


// we can use predefined format string like tiny
// app.use(morgan('tiny'))
//morgan.token('body', (req, res) => JSON.stringify(req.body))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
	Register.find({}).then(persons => {
		console.log(persons)
		response.json(persons)
	})
})

app.get('/info', (request, response) => {
    let date = new Date()
    response.send(`<p>Phonebook has ${persons.length} entries</p>
    <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
	Register.findById(request.params.id)
	.then(person => {
		if (person) {
			console.log(person)
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
	.catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Register.findByIdAndRemove(request.params.id)
	.then(result => {
		response.status(204).end()
	})
	.catch(error => next(error))
})


app.post('/api/persons', async(request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
      return response.status(400).json({
          error: 'name or number is missing'
      })
  } 

  const exists = await Register.find({ name: body.name }) 
	console.log(exists)
	
	if (exists.length) {
		return response.status(400).json({
			error: 'name already exists'
		})
	} else {

		const person = new Register({
			name: body.name,
			number: body.number,
		})
	
		person.save().then(savedPerson => {
			console.log(savedPerson)
			return response.json(savedPerson)
		})

	}

})

/*
app.put('/api/persons/:id', (request, response) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Register.findByIdAndUpdate(request.params.id, person, {new: true})
	.then(updatedPerson => {
		response.json(updatedPerson)
	})
})
*/

const unKnownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unKnownEndPoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name = 'CastError') {
		response.status(400).send({
			error: 'malformatted id'
		})
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({
			error: error.message
		})
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
