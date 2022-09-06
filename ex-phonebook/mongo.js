const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide password as an argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.l2hp6.mongodb.net/?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Register = mongoose.model('Register', phoneSchema)

if (process.argv.length == 3) {
	mongoose
	.connect(url)
	.then(result => {
		console.log('connected\n')

		Register.find({}).then(persons => {
			console.log('phonebook: ')
			persons.forEach(person => {
				console.log(person.name, person.number)
			})
		})

		mongoose.connection.close()
	})
}

if (process.argv.length == 5) {
	mongoose
	.connect(url)
	.then(result => {
		console.log('connected')
	
		const register = new Register({
			name: process.argv[3],
			number: process.argv[4],
		})

		return register.save()
	})
	.then(() => {
		console.log(`added number ${process.argv[3]} ${process.argv[4]}`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))
}

